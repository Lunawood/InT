"""
Django settings for InT project.

Generated by 'django-admin startproject' using Django 5.0.6.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path
from dotenv import load_dotenv
from .utils import update_env_with_public_ip
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
# .env 파일 경로 (부모 디렉토리)
env_path = BASE_DIR / '.env'
# 퍼블릭 IP를 .env 파일에 업데이트
update_env_with_public_ip(env_path)
# .env 파일 로드
load_dotenv(env_path)
# 환경 변수에서 SECRET_KEY 가져오기
SECRET_KEY = os.getenv('SECRET_KEY')
# 환경 변수에서 퍼블릭 IP 주소 가져오기
PUBLIC_IP = os.getenv('PUBLIC_IP')


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition
INSTALLED_APPS = [
    "corsheaders",
    
    # Library
    "rest_framework",
    "rest_framework_simplejwt",
    "rest_framework.authtoken",
    
    # Basic APP
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    
    # Added APP
    "homepage",
    "timetablepage",
    "algorithm",
]

MIDDLEWARE = [
    # Added Middleware
    "corsheaders.middleware.CorsMiddleware",
    # Basic Middleware
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "InT.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "InT.wsgi.application"

AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
]


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# JWT
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_RENDERER_CLASSES": (
        "rest_framework.renderers.JSONRenderer",
        "rest_framework.renderers.BrowsableAPIRenderer",
    ),
}

from datetime import timedelta

# JWT를 사용하기 위해 꼭 사용해야 한다.
#AUTH_USER_MODEL = 'homepage.Users'

DATABASES = {
    "default": {
        "ENGINE": os.getenv('DATABASES_ENGINE'),
        "NAME": os.getenv('DATABASES_NAME'),
        "USER": os.getenv('DATABASES_USER'),
        "PASSWORD": os.getenv('DATABASES_PASSWORD'),
        "HOST": os.getenv('DATABASES_HOST'),
        "PORT": os.getenv('DATABASES_PORT')
    }
}

#JWT 설정
SIMPLE_JWT = {
    # 사용하는 토큰 받기 30일 동안 유효.
    'ACCESS_TOKEN_LIFETIME': timedelta(days=30),
    # 사용자는 1달 동안은 자동 로그인.
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'ROTATE_REFRESH_TOKENS': False,
    'UPDATE_LAST_LOGIN': False,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    # 토큰 안 필드들
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
}

# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = "ko-kr"

TIME_ZONE = "Asia/Seoul"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# CORS를 요청할 IP허용
# 개발용 : CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_ALL_ORIGINS = True

ALLOWED_HOSTS = [
    PUBLIC_IP
]

CORS_ALLOW_CREDENTIALS = True

# Cache 설정
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        'LOCATION': 'cache',
    }
}
# CACHES = {
#     'default': {
#         'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
#         'LOCATION': 'unique-snowflake',
#     }
# }
