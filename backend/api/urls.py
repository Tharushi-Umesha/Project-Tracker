from django.urls import path; # type: ignore
from .views import *;
from rest_framework.routers import DefaultRouter;

router = DefaultRouter()
router.register('project', ProjectViewset, basename='project')
router.register('projectmanager', ProjectManagerViewset, basename='projectmanager')
urlpatterns = router.urls

# urlpatterns = [
#     path('', home)
# ]