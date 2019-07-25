# the import sectionw`1
import webapp2
import jinja2
import os
from google.appengine.ext import ndb
from models import mainuser
# this initializes the jinja2 environment
# this will be the same in every app that uses the jinja2 templating library 
jinja_current_directory = jinja2.Environment(
  loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
  extensions=['jinja2.ext.autoescape'],
  autoescape=True)

# other functions should go above the handlers or in a separate file

class MainHandler(webapp2.RequestHandler):
  	def get(self):  # for a get request
  		Mainscreen = jinja_current_directory.get_template("templates/index.html")
  		self.response.write(Mainscreen.render())
# the handler section
  
class Login(webapp2.RequestHandler):
  def get(self):
    loginpage =jinja_current_directory.get_template("templates/index.html")
    self.response.write(loginpage.render())

 		
  def post(self):
    useName = self.request.get('username')
    user = mainuser(
      username= self.request.get('username'),
      password= self.request.get('password'),

    	)
    user.put()
    #MainPage=jinja_current_directory.get_template("/templates/index.html")
    self.response.write("Okay, cool.")

class Sign_up(webapp2.RequestHandler):
  def get(self):
    sign_up_template=jinja_current_directory.get_template('templates/sign-up.html')
    self.response.write(sign_up_template.render())
# the app configuration section	
app = webapp2.WSGIApplication([
  #('/', MainPage),
  ('/',Sign_up),
  ('/login',Login)
  ], debug=True)