import * as cdk from '@aws-cdk/core';
import * as cloudfront from '@aws-cdk/aws-cloudfront'
import * as s3 from '@aws-cdk/aws-s3'
import * as s3deploy from '@aws-cdk/aws-s3-deployment'
import * as iam from '@aws-cdk/aws-iam'

export class highRevelConstruct extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // CloudFront オリジン用のS3バケットを作成する
    const originBucket = new s3.Bucket(this, 'cdk-cloudfront-bucket', {
      // バケット名
      bucketName: 'cdk-cloudfront-bucket',
      // CDKスタック削除時の挙動(スタック削除時にバケットも削除する)
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    // CloudFront で設定する オリジンアクセスアイデンティティ を作成する
    const oai = new cloudfront.OriginAccessIdentity(this, 'cdk-cloudfront-oai', {
        comment: 's3 access.'
    })

    // S3バケットポリシーで、CloudFrontのオリジンアクセスアイデンティティを許可する
    const policy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['s3:GetObject'],
      principals: [new iam.CanonicalUserPrincipal(oai.cloudFrontOriginAccessIdentityS3CanonicalUserId)],
      resources: [
        originBucket.bucketArn + '/*'
      ]
    });
    originBucket.addToResourcePolicy(policy)

    // CloudFrontディストリビューションを作成する
    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'cdk-test-cloudfront', {
      defaultRootObject: 'test.png',
      viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      httpVersion: cloudfront.HttpVersion.HTTP2,
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: originBucket,
            originAccessIdentity: oai
          },
          behaviors: [
            {
              isDefaultBehavior: true,
              compress: true,
              minTtl: cdk.Duration.seconds(0),
              maxTtl: cdk.Duration.days(365),
              defaultTtl: cdk.Duration.days(1),
            }
          ]
        }
      ]
    })
    new s3deploy.BucketDeployment(this, 'deploy-image', {
      sources: [s3deploy.Source.asset('./s3')],
      destinationBucket: originBucket
    })
  }
}