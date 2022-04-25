"""
App Config Module
"""

from django.apps import AppConfig as DjangoAppConfig


class AppConfig(DjangoAppConfig):
    """
    Django App Config
    """

    name = "server"
    verbose_name = " Satoshi's Garden Backend"
