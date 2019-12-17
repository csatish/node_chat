const mongoose = require('mongoose')

let Message = mongoose.Schema({
    msgId: {
        type: Number,
        autoIndexId : true,
    },
    creatorId: {
        type: Number
    },
    createDate: {
        type: Date
    },
    message: {
        type:String
    },
    parentMsgId: {
        type: Number
    },
    recipientId: {
        type: Number
    },
    recipientGroupId: {
        type: Number
    },
    isRead: {
        type: String
    },
    status: {
        type: Number
    }
})

export default mongoose.model('messages', Message)