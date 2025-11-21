import importlib
import os
from fastapi import APIRouter

router = APIRouter()

# 현재 디렉토리에서 모든 .py 파일 찾기
module_names = [f[:-3] for f in os.listdir(os.path.dirname(__file__)) if f.endswith('.py') and f != '__init__.py']

# 모든 모듈에서 router 객체 가져와서 등록
for module_name in module_names:
    module = importlib.import_module(f'be_src.apps.routers.{module_name}')
    if hasattr(module, 'router'):
        router.include_router(module.router)