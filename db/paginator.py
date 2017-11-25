
class Paginator:

    def __init__(self,key_id):
        self.page_size=2
        self.key_id=key_id
        self.page_number=1


    def setAttr(self,page_number):
        self.page_number = page_number

    
    def getAttr(self):
        return {'page_size':self.page_size,
                'key_id':self.key_id,
                'page_number':self.page_number
        }
