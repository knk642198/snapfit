import boto3
from botocore.exceptions import NoCredentialsError, ClientError

# S3 클라이언트 (리전 중요!)
s3_client = boto3.client('s3', region_name='us-west-2')

# 버킷 이름
S3_BUCKET_NAME = "snapfit-images"


def generate_presigned_url(s3_key: str, expiration: int = 3600) -> str | None:
    """
    S3 객체에 대한 presigned URL을 생성합니다.
    
    Args:
        s3_key: S3 객체 키 (예: "KSH03777.jpg")
        expiration: URL 유효 시간 (초, 기본값 1시간)
    
    Returns:
        presigned URL 문자열 또는 None (에러 시)
    """
    try:
        url = s3_client.generate_presigned_url(
            'get_object',
            Params={
                'Bucket': S3_BUCKET_NAME,
                'Key': s3_key
            },
            ExpiresIn=expiration
        )
        return url
    except NoCredentialsError:
        print("AWS credentials를 찾을 수 없습니다.")
        return None
    except ClientError as e:
        print(f"Presigned URL 생성 실패: {e}")
        return None


def list_s3_objects(prefix: str = "") -> list[dict]:
    """
    S3 버킷의 객체 목록을 조회합니다.
    """
    try:
        response = s3_client.list_objects_v2(
            Bucket=S3_BUCKET_NAME,
            Prefix=prefix
        )
        
        objects = []
        for obj in response.get("Contents", []):
            objects.append({
                "key": obj["Key"],
                "size": obj["Size"],
                "last_modified": obj["LastModified"].isoformat()
            })
        return objects
    except (NoCredentialsError, ClientError) as e:
        print(f"S3 객체 목록 조회 실패: {e}")
        return []


def get_all_images_with_presigned_urls(prefix: str = "", expiration: int = 3600) -> list[dict]:
    """
    S3 버킷의 모든 이미지와 presigned URL을 반환합니다.
    """
    objects = list_s3_objects(prefix)
    result = []
    
    for obj in objects:
        presigned_url = generate_presigned_url(obj["key"], expiration)
        if presigned_url:
            result.append({
                "key": obj["key"],
                "presigned_url": presigned_url,
                "size": obj["size"],
                "last_modified": obj["last_modified"]
            })
    
    return result
