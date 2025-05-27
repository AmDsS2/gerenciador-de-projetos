"""
WSGI config for teamflow project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os
import sys
from django.core.wsgi import get_wsgi_application
from dotenv import load_dotenv

# Adiciona o diretório do projeto ao Python path
path = '/home/aryanmartins/gerenciador-de-projetos'
if path not in sys.path:
    sys.path.append(path)

load_dotenv()

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'teamflow.settings')

application = get_wsgi_application()
