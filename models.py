from google.appengine.ext import ndb
class mainuser(ndb.Model):


  username = ndb.StringProperty(required = True)
  password = ndb.StringProperty(required = True)
  