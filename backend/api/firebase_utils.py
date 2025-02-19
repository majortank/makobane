import firebase_admin
from firebase_admin import credentials, firestore

# Ensure the path to the credentials file is correct
cred = credentials.Certificate("/home/majortank/makobane/firebase-adminsdk.json")
default_app = firebase_admin.initialize_app(cred)

db = firestore.client()

def get_words():
    words_ref = db.collection('words')
    return [doc.to_dict() for doc in words_ref.stream()]

def add_word(word, definition):
    doc_ref = db.collection('words').document()
    doc_ref.set({
        'word': word,
        'definition': definition,
        'created_at': firestore.SERVER_TIMESTAMP
    })
    return doc_ref.id