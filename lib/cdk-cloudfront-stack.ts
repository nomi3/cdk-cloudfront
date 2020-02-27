import * as cdk from '@aws-cdk/core';
import * as cloudfront from '@aws-cdk/aws-cloudfront'
import * as s3 from '@aws-cdk/aws-s3'
import * as s3deploy from '@aws-cdk/aws-s3-deployment'
import * as iam from '@aws-cdk/aws-iam'

export class CdkCloudfrontStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const sourceBucket = new s3.Bucket(this, 'bucket', {
      bucketName: 'cloudfront-test-source',
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })
    new s3deploy.BucketDeployment(this, 'deploy-image', {
      sources: [s3deploy.Source.asset('./s3')],
      destinationBucket: sourceBucket
    })
    // // CloudFront で設定する オリジンアクセスアイデンティティ を作成する
    // const oai = new cloudfront.CfnCloudFrontOriginAccessIdentity(this, 'test-oai', {
    //   cloudFrontOriginAccessIdentityConfig: {
    //     comment: 's3 access.',
    //   }
    // })
    // // S3バケットポリシーで、CloudFrontのオリジンアクセスアイデンティティを許可する
    // const policy = new iam.PolicyStatement({
    //   effect: iam.Effect.ALLOW,
    //   actions: ['s3:GetObject'],
    //   principals: [new iam.CanonicalUserPrincipal(oai.attrS3CanonicalUserId)],
    //   resources: [
    //     sourceBucket.bucketArn + '/*'
    //   ]
    // })
    // sourceBucket.addToResourcePolicy(policy)

    new cloudfront.CfnDistribution(this, 'distribution', {
      distributionConfig: {
        enabled: true,
        comment: 'cdk cloudfront test',
        origins: [
          {
            domainName: sourceBucket.bucketDomainName,
            id: 'image-distribution',
            s3OriginConfig: {
              // originAccessIdentity: 'origin-access-identity/cloudfront/' + oai.attrS3CanonicalUserId
            }
          }
        ],
        defaultCacheBehavior: {
          forwardedValues: {
            queryString: true
          },
          targetOriginId: 'image-distribution',
          viewerProtocolPolicy: 'redirect-to-https',
          // defaultTtl: 86400,
          // minTtl: 0,
          // maxTtl: 31536000
        }
      }
    })
  }
}
