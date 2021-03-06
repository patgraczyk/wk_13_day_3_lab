const PubSub = require('../helpers/pub_sub.js')
const Request = require('../helpers/request.js')

const BucketItems = function(passingUrlHereBeDumbYo){
    this.url = 'http://localhost:3000/api/bucketList';
    this.request = new Request(this.url)
}

BucketItems.prototype.bindEvents = function() {
    
    PubSub.subscribe('BucketItemView:item-to-complete', (event) => {
        this.updateBucketItem(event.detail);
    });

    PubSub.subscribe('BucketItemView:item-to-delete', (event) => {
        this.deleteBucketItem(event.detail);
    });

    PubSub.subscribe('BucketItemFormView:item-submitted', (event) =>{
        console.log(event.detail);
        this.postBucketItem(event.detail);
    });
}

BucketItems.prototype.getData = function(){
    this.request.get()
    .then((bucketList) => {
        PubSub.publish('BucketItems:data-loaded', bucketList);
    })
    .catch(console.error);
}

BucketItems.prototype.postBucketItem = function(item){
    console.log(item)
    this.request.post(item)
    .then((bucketList) => {
        console.log(bucketList);
        PubSub.publish('BucketItems:data-loaded', bucketList);
    })
    .catch(console.error);
}

BucketItems.prototype.deleteBucketItem = function(item){
    console.log(item)
    this.request.delete(item)
    .then((bucketList) => {
        console.log(bucketList);
        PubSub.publish('BucketItems:data-loaded', bucketList);
    })
    .catch(console.error);
}

BucketItems.prototype.updateBucketItem = function(item){
    console.log(item);
    this.request.put(item)
    .then((bucketList) => {
        console.log(bucketList);
        PubSub.publish('BucketItems:data-loaded', bucketList);
    })
    .catch(console.error);
}

module.exports = BucketItems;