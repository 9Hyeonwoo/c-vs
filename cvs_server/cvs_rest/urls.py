from django.conf.urls import url
from cvs_rest import views
from rest_framework.urlpatterns import format_suffix_patterns
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    url(r'^login/$', views.CustomAuthToken.as_view()),
    url(r'^signup/$', views.sign_up),
    url(r'^users/$', views.CustomUserList.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/$', views.CustomUserDetail.as_view()),
    url(r'products/$', views.ProductList.as_view()),
    url(r'products/(?P<pk>[0-9]+)/$', views.ProductDetail.as_view()),
    url(r'^reviews/$', views.get_create_review),
    url(r'^reviews/(?P<pk>[0-9]+)/$', views.review_detail),
    url(r'comments/$', views.create_comment),
    url(r'comments/(?P<pk>[0-9]+)/$', views.comment_detail),
    url(r'recipes/$', views.get_create_recipe),
    url(r'recipes/(?P<pk>[0-9]+)/$', views.recipe_detail),
    url(r'posts/$', views.get_create_post),
    url(r'posts/(?P<pk>[0-9]+)/$', views.post_detail),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns = format_suffix_patterns(urlpatterns)
