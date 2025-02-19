# backend/api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from firebase_admin import firestore
from .firebase_utils import get_words, add_word

db = firestore.client()

class WordList(APIView):
    def get(self, request):
        words = get_words()
        return Response({"words": words}, status=status.HTTP_200_OK)

    def post(self, request):
        word_id = add_word(request.data)
        return Response({"id": word_id}, status=status.HTTP_201_CREATED)

class WordViewSet(viewsets.ViewSet):
    def list(self, request):
        words = get_words()
        return Response({"words": words})

    def create(self, request):
        word = request.data.get('word')
        definition = request.data.get('definition')
        word_id = add_word(word, definition)
        return Response({"id": word_id}, status=201)

class DefinitionViewSet(viewsets.ViewSet):
    def list(self, request):
        definitions_ref = db.collection('definitions')
        all_definitions = [doc.to_dict() for doc in definitions_ref.stream()]
        return Response({"definitions": all_definitions})

    def create(self, request):
        data = request.data
        doc_ref = db.collection('definitions').document()
        doc_ref.set({
            'word': data.get('word'),
            'definition': data.get('definition'),
            'created_at': firestore.SERVER_TIMESTAMP
        })
        return Response({"id": doc_ref.id}, status=201)