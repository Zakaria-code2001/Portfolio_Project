import unittest
from config import TestConfig
from exts import db
from main import create_app


class APITestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(TestConfig)

        self.client = self.app.test_client()

        with self.app.app_context():
            db.init_app(self.app)
            db.create_all()

    def test_hello_world(self):
        hello_response = self.client.get('/views/hello')
        json = hello_response.json
        self.assertEqual(json, {"message": "Hello World"})

    def test_signup(self):
        signup_data = {
            "first_name": "testname",
            "last_name": "testlast",
            "email": "testemail@test.com",
            "password": "dnaininw"
        }
        signup_response = self.client.post('/auth/signup', json=signup_data)
        status_code = signup_response.status_code
        self.assertEqual(status_code, 201)
        response_data = signup_response.json
        self.assertEqual(response_data, {"message": "User created successfully"})

    def test_login(self):
        signup_data = {
            "first_name": "testname",
            "last_name": "testlast",
            "email": "testemail@test.com",
            "password": "dnaininw"
        }
        signup_response = self.client.post('/auth/signup', json=signup_data)
        response_data = signup_response.json
        self.assertEqual(signup_response.status_code, 201)
        login_data = {
            "email": "testemail@test.com",
            "password": "dnaininw"
        }
        login_response = self.client.post('/auth/login', json=login_data)
        status_code = login_response.status_code

        #print(response_data)

    def test_get_all_playlists(self):
        """TEST GETTING ALL PLAYLISTS"""
        response = self.client.get('views/playlists')
        status_code = response.status_code
        self.assertEqual(status_code, 200)

    def test_get_one_playlist(self):
        id = 2
        response = self.client.get(f'views/playlists/{id}')
        status_code = response.status_code
        self.assertEqual(status_code, 404)

    def test_create_playlist(self):
        signup_data = {
            "first_name": "testname",
            "last_name": "testlast",
            "email": "testemail@test.com",
            "password": "dnaininw"
        }
        signup_response = self.client.post('/auth/signup', json=signup_data)
        self.assertEqual(signup_response.status_code, 201)

        login_data = {
            "email": "testemail@test.com",
            "password": "dnaininw"
        }
        login_response = self.client.post('/auth/login', json=login_data)
        self.assertEqual(login_response.status_code, 200)

        access_token = login_response.json.get('access_token')
        #print("Access Token:", access_token)
        self.assertIsNotNone(access_token)

        playlist_data = {
            "name": "Test Playlist",
            "image_file": "path/to/your/image.jpg"
        }
        playlist_response = self.client.post('/views/playlists',
                                             headers={'Authorization': f'Bearer {access_token}'},
                                             json=playlist_data)
        #print(playlist_response.json)
        self.assertEqual(playlist_response.status_code, 201)
        self.assertIn('id', playlist_response.json)
        self.assertEqual(playlist_response.json['name'], playlist_data['name'])
        self.assertEqual(playlist_response.json['image_file'], playlist_data['image_file'])

    def test_update_playlist(self):
        signup_data = {
            "first_name": "testname",
            "last_name": "testlast",
            "email": "testemail@test.com",
            "password": "dnaininw"
        }
        signup_response = self.client.post('/auth/signup', json=signup_data)
        self.assertEqual(signup_response.status_code, 201)

        login_data = {
            "email": "testemail@test.com",
            "password": "dnaininw"
        }
        login_response = self.client.post('/auth/login', json=login_data)
        self.assertEqual(login_response.status_code, 200)

        access_token = login_response.json.get('access_token')
        self.assertIsNotNone(access_token)
        playlist_data = {
            "name": "Test Playlist",
            "image_file": "path/to/your/image.jpg"
        }
        playlist_response = self.client.post('/views/playlists',
                                             headers={'Authorization': f'Bearer {access_token}'},
                                             json=playlist_data)
        self.assertEqual(playlist_response.status_code, 201)
        playlist_id = playlist_response.json['id']
        updated_playlist_data = {
            "name": "Updated Test Playlist",
            "image_file": "path/to/your/updated_image.jpg"
        }
        update_response = self.client.put(f'/views/playlist/{playlist_id}',
                                          headers={'Authorization': f'Bearer {access_token}'},
                                          json=updated_playlist_data)

        self.assertEqual(update_response.status_code, 200)
        self.assertEqual(update_response.json['name'], updated_playlist_data['name'])
        self.assertEqual(update_response.json['image_file'], updated_playlist_data['image_file'])

    def test_delete_playlist(self):
        signup_data = {
            "first_name": "testname",
            "last_name": "testlast",
            "email": "testemail@test.com",
            "password": "dnaininw"
        }
        signup_response = self.client.post('/auth/signup', json=signup_data)
        self.assertEqual(signup_response.status_code, 201)

        login_data = {
            "email": "testemail@test.com",
            "password": "dnaininw"
        }
        login_response = self.client.post('/auth/login', json=login_data)
        self.assertEqual(login_response.status_code, 200)

        access_token = login_response.json.get('access_token')
        self.assertIsNotNone(access_token)
        playlist_data = {
            "name": "Test Playlist",
            "image_file": "path/to/your/image.jpg"
        }
        playlist_response = self.client.post('/views/playlists',
                                             headers={'Authorization': f'Bearer {access_token}'},
                                             json=playlist_data)
        self.assertEqual(playlist_response.status_code, 201)
        playlist_id = playlist_response.json['id']
        delete_response = self.client.delete(f'/views/playlist/{playlist_id}',
                                             headers={'Authorization': f'Bearer {access_token}'})

        self.assertEqual(delete_response.status_code, 204)
        get_response = self.client.get(f'/views/playlist/{playlist_id}',
                                       headers={'Authorization': f'Bearer {access_token}'})

        self.assertEqual(get_response.status_code, 404)

    def test_get_all_videos_on_playlist(self):
        signup_data = {
            "first_name": "testname",
            "last_name": "testlast",
            "email": "testemail@test.com",
            "password": "dnaininw"
        }
        signup_response = self.client.post('/auth/signup', json=signup_data)
        self.assertEqual(signup_response.status_code, 201)

        login_data = {
            "email": "testemail@test.com",
            "password": "dnaininw"
        }
        login_response = self.client.post('/auth/login', json=login_data)
        self.assertEqual(login_response.status_code, 200)

        access_token = login_response.json.get('access_token')
        self.assertIsNotNone(access_token)
        playlist_data = {
            "name": "Test Playlist",
            "image_file": "path/to/your/image.jpg"
        }
        playlist_response = self.client.post('/views/playlists',
                                             headers={'Authorization': f'Bearer {access_token}'},
                                             json=playlist_data)
        self.assertEqual(playlist_response.status_code, 201)
        playlist_id = playlist_response.json['id']
        video1_data = {
            "title": "Video 1",
            "url": "https://example.com/video1"
        }
        video2_data = {
            "title": "Video 2",
            "url": "https://example.com/video2"
        }
        self.client.post(f'/views/playlist/{playlist_id}/videos',
                         headers={'Authorization': f'Bearer {access_token}'},
                         json=video1_data)
        self.client.post(f'/views/playlist/{playlist_id}/videos',
                         headers={'Authorization': f'Bearer {access_token}'},
                         json=video2_data)
        get_response = self.client.get(f'/views/playlist/{playlist_id}/videos',
                                       headers={'Authorization': f'Bearer {access_token}'})
        self.assertEqual(get_response.status_code, 200)
        videos = get_response.json
        self.assertEqual(len(videos), 2)

    def test_get_one_videos_on_playlist(self):
        signup_data = {
            "first_name": "testname",
            "last_name": "testlast",
            "email": "testemail@test.com",
            "password": "dnaininw"
        }
        signup_response = self.client.post('/auth/signup', json=signup_data)
        self.assertEqual(signup_response.status_code, 201)

        login_data = {
            "email": "testemail@test.com",
            "password": "dnaininw"
        }
        login_response = self.client.post('/auth/login', json=login_data)
        self.assertEqual(login_response.status_code, 200)

        access_token = login_response.json.get('access_token')
        self.assertIsNotNone(access_token)
        playlist_data = {
            "name": "Test Playlist",
            "image_file": "path/to/your/image.jpg"
        }
        playlist_response = self.client.post('/views/playlists',
                                             headers={'Authorization': f'Bearer {access_token}'},
                                             json=playlist_data)
        self.assertEqual(playlist_response.status_code, 201)
        playlist_id = playlist_response.json['id']
        video_data = {
            "title": "Test Video",
            "url": "https://example.com/test_video"
        }
        video_response = self.client.post(f'/views/playlist/{playlist_id}/videos',
                                          headers={'Authorization': f'Bearer {access_token}'},
                                          json=video_data)
        self.assertEqual(video_response.status_code, 201)
        video_id = video_response.json['id']
        get_video_response = self.client.get(f'/views/playlist/{playlist_id}/video/{video_id}',
                                             headers={'Authorization': f'Bearer {access_token}'})
        self.assertEqual(get_video_response.status_code, 200)
        retrieved_video = get_video_response.json
        self.assertEqual(retrieved_video['id'], video_id)
        self.assertEqual(retrieved_video['title'], video_data['title'])
        self.assertEqual(retrieved_video['url'], video_data['url'])

    def test_create_video(self):
        signup_data = {
            "first_name": "testname",
            "last_name": "testlast",
            "email": "testemail@test.com",
            "password": "dnaininw"
        }
        signup_response = self.client.post('/auth/signup', json=signup_data)
        self.assertEqual(signup_response.status_code, 201)

        login_data = {
            "email": "testemail@test.com",
            "password": "dnaininw"
        }
        login_response = self.client.post('/auth/login', json=login_data)
        self.assertEqual(login_response.status_code, 200)

        access_token = login_response.json.get('access_token')
        self.assertIsNotNone(access_token)
        playlist_data = {
            "name": "Test Playlist",
            "image_file": "path/to/your/image.jpg"
        }
        playlist_response = self.client.post('/views/playlists',
                                             headers={'Authorization': f'Bearer {access_token}'},
                                             json=playlist_data)
        self.assertEqual(playlist_response.status_code, 201)
        playlist_id = playlist_response.json['id']
        video_data = {
            "title": "Test Video",
            "url": "https://example.com/test_video"
        }
        video_response = self.client.post(f'/views/playlist/{playlist_id}/videos',
                                          headers={'Authorization': f'Bearer {access_token}'},
                                          json=video_data)
        self.assertEqual(video_response.status_code, 201)
        new_video = video_response.json
        self.assertEqual(new_video['title'], video_data['title'])
        self.assertEqual(new_video['url'], video_data['url'])

    def test_read_video(self):
        signup_data = {
            "first_name": "testname",
            "last_name": "testlast",
            "email": "testemail@test.com",
            "password": "dnaininw"
        }
        signup_response = self.client.post('/auth/signup', json=signup_data)
        self.assertEqual(signup_response.status_code, 201)

        login_data = {
            "email": "testemail@test.com",
            "password": "dnaininw"
        }
        login_response = self.client.post('/auth/login', json=login_data)
        self.assertEqual(login_response.status_code, 200)

        access_token = login_response.json.get('access_token')
        self.assertIsNotNone(access_token)
        playlist_data = {
            "name": "Test Playlist",
            "image_file": "path/to/your/image.jpg"
        }
        playlist_response = self.client.post('/views/playlists',
                                             headers={'Authorization': f'Bearer {access_token}'},
                                             json=playlist_data)
        self.assertEqual(playlist_response.status_code, 201)
        playlist_id = playlist_response.json['id']
        video_data = {
            "title": "Test Video",
            "url": "https://example.com/test_video"
        }
        video_response = self.client.post(f'/views/playlist/{playlist_id}/videos',
                                          headers={'Authorization': f'Bearer {access_token}'},
                                          json=video_data)
        self.assertEqual(video_response.status_code, 201)
        video_id = video_response.json['id']
        get_video_response = self.client.get(f'/views/playlist/{playlist_id}/video/{video_id}',
                                             headers={'Authorization': f'Bearer {access_token}'})
        self.assertEqual(get_video_response.status_code, 200)
        retrieved_video = get_video_response.json
        self.assertEqual(retrieved_video['id'], video_id)
        self.assertEqual(retrieved_video['title'], video_data['title'])
        self.assertEqual(retrieved_video['url'], video_data['url'])

    def test_update_video(self):
        signup_data = {
            "first_name": "testname",
            "last_name": "testlast",
            "email": "testemail@test.com",
            "password": "dnaininw"
        }
        signup_response = self.client.post('/auth/signup', json=signup_data)
        self.assertEqual(signup_response.status_code, 201)

        login_data = {
            "email": "testemail@test.com",
            "password": "dnaininw"
        }
        login_response = self.client.post('/auth/login', json=login_data)
        self.assertEqual(login_response.status_code, 200)

        access_token = login_response.json.get('access_token')
        self.assertIsNotNone(access_token)
        playlist_data = {
            "name": "Test Playlist",
            "image_file": "path/to/your/image.jpg"
        }
        playlist_response = self.client.post('/views/playlists',
                                             headers={'Authorization': f'Bearer {access_token}'},
                                             json=playlist_data)
        self.assertEqual(playlist_response.status_code, 201)
        playlist_id = playlist_response.json['id']
        video_data = {
            "title": "Test Video",
            "url": "https://example.com/test_video"
        }
        video_response = self.client.post(f'/views/playlist/{playlist_id}/videos',
                                          headers={'Authorization': f'Bearer {access_token}'},
                                          json=video_data)
        self.assertEqual(video_response.status_code, 201)
        video_id = video_response.json['id']
        updated_video_data = {
            "title": "Updated Test Video",
            "url": "https://example.com/updated_test_video"
        }
        update_response = self.client.put(f'/views/playlist/{playlist_id}/video/{video_id}',
                                          headers={'Authorization': f'Bearer {access_token}'},
                                          json=updated_video_data)
        self.assertEqual(update_response.status_code, 201)
        updated_video = update_response.json
        self.assertEqual(updated_video['id'], video_id)
        self.assertEqual(updated_video['title'], updated_video_data['title'])
        self.assertEqual(updated_video['url'], updated_video_data['url'])

    def test_delete_video(self):
        signup_data = {
            "first_name": "testname",
            "last_name": "testlast",
            "email": "testemail@test.com",
            "password": "dnaininw"
        }
        signup_response = self.client.post('/auth/signup', json=signup_data)
        self.assertEqual(signup_response.status_code, 201)

        login_data = {
            "email": "testemail@test.com",
            "password": "dnaininw"
        }
        login_response = self.client.post('/auth/login', json=login_data)
        self.assertEqual(login_response.status_code, 200)

        access_token = login_response.json.get('access_token')
        self.assertIsNotNone(access_token)
        playlist_data = {
            "name": "Test Playlist",
            "image_file": "path/to/your/image.jpg"
        }
        playlist_response = self.client.post('/views/playlists',
                                             headers={'Authorization': f'Bearer {access_token}'},
                                             json=playlist_data)
        self.assertEqual(playlist_response.status_code, 201)
        playlist_id = playlist_response.json['id']

        video_data = {
            "title": "Test Video",
            "url": "https://example.com/test_video"
        }
        video_response = self.client.post(f'/views/playlist/{playlist_id}/videos',
                                          headers={'Authorization': f'Bearer {access_token}'},
                                          json=video_data)
        self.assertEqual(video_response.status_code, 201)
        video_id = video_response.json['id']
        delete_response = self.client.delete(f'/views/playlist/{playlist_id}/video/{video_id}',
                                             headers={'Authorization': f'Bearer {access_token}'})
        self.assertEqual(delete_response.status_code, 204)
        get_response = self.client.get(f'/views/playlist/{playlist_id}/video/{video_id}',
                                       headers={'Authorization': f'Bearer {access_token}'})
        self.assertEqual(get_response.status_code, 404)

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()


if __name__ == '__main__':
    unittest.main()
