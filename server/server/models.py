from django.db import models
import uuid


class BaseModel(models.Model):
    """
    Base model
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        """
        Meta Class Definition
        """

        abstract = True

class Node(BaseModel):
    alias = models.CharField(max_length=200)
    pub_key = models.CharField(max_length=200)

    def __unicode__(self):
        return self.alias

class Edge(BaseModel):
    peer_one = models.ForeignKey(
        Node, blank=True, null=True, on_delete=models.CASCADE, related_name="peer_one",
    )
    peer_two = models.ForeignKey(
        Node, blank=True, null=True, on_delete=models.CASCADE, related_name="peer_two",
    )

    def __unicode__(self):
        return self.id