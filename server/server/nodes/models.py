from django import models

class Node(models.Model):
    alias = NULL
    pub_key = NULL
    

    def __unicode__(self):
        return self.name

class Edge(models.Model):
    inbound_peer = NULL
    outbound_peer = NULL

    def __unicode__(self):
        return self.name