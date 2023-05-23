from django.views import generic

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
import requests, json

class IndexView(generic.TemplateView):
    template_name = 'common/index.html'


class RestViewSet(viewsets.ViewSet):
    @action(
        detail=False,
        methods=['get'],
        permission_classes=[AllowAny],
        url_path='rest-check',
    )
    def rest_check(self, request):
        return Response(
            {"result": "If you're seeing this, the REST API is working!"},
            status=status.HTTP_200_OK,
        )

    @action(
        detail=False,
        methods=['get'],
        permission_classes=[AllowAny],
        url_path='search'
    )
    def search(self, request):
        print(request.query_params)
        query = request.query_params
        if not query.get('q'):
            return Response('Bad Params')
        try: 
            res = requests.get('https://lexica.art/api/v1/search?q='+query['q'])
            data = json.loads(res.text)
            return Response(data)
        except:
            return Response('Error')