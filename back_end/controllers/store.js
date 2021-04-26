import formidable from 'formidable'
import  fs  from 'fs'
import  Store from  "../models/store"
import  _ from 'lodash'
export  const addStore = (req, res) =>{
    let form = formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req , (err,fildes, files) =>{
        console.log(fildes);
        if(err) {
            return res.status(400).json({
                err : " Thêm thông tin thất bại !"
            })
        }
        const {name,address, phone , description} = fildes
        if(!name || !address || !phone || !description){
            return res.status(400).json({
                err: " Cần nhập đầy đủ các trường !"
            })
        }
        let store = new  Store(fildes)
        store.photo.data = fs.readFileSync(files.photo.path)
        store.photo.contentType = files.photo.type
        store.save((err, data)=>{
            if(err){
                return res.status(400).json({
                    err : " Thêm thất bại !"
                })
            }
            res.json(data)
        })
    })
}
export const lisStore = (req, res)=>{
    Store.find((err, data)=>{
        if(err){
            return res.status(400).json({
                err: "lỗi"
            })
        }
        res.json(data)
    })
}
export  const storeId  = (req, res, next , id) =>{
        Store.findById(id).exec((err,data)=>{
            if(err){
                return res.status(400).json({
                    err: "Không có  !"
                })
            }
            req.data  = data;
            next();
        })
}
export  const  remove = (req,res)=>{
        let store = req.data
        store.remove((err,data)=>{
            if(err){
                return res.status(400).json({
                    err : " Xóa thất bại ! "
                })
            }
            res.json({
                data,
                message:  " Xóa Thành công !"
            })
        })
}
export const update = (req, res)=>{
    let form = formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req , (err,fildes, files) =>{3
        if(err) {
            return res.status(400).json({
                err : " Cập Nhật  thông tin thất bại !"
            })
        }
        // const {name,address, phone , description} = fildes
        // if(!name || !address || !phone || !description){
        //     return res.status(400).json({
        //         err: " Cần nhập đầy đủ các trường !"
        //     })
        // }
        let store =  req.data
        store = _.assignIn(store,fildes )
        if(files.photo){
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    err: "Ảnh quá lớn"
                })
            }
            store.photo.data = fs.readFileSync(files.photo.path)
            store.photo.contentType = files.photo.path
        }
        store.save((err, data)=>{
            if(err){
                return res.status(400).json({
                    err : " Cập Nhật thất bại !"
                })
            }
            res.json({
                data , message : "Thành công"
            })
        })
    })
}
export const  storeDetails = (req, res)=>{
         return res.json(req.data)
}
export const photo =(req, res)=>{
    console.log(req.data.photo.data);
    if(req.data.photo.data){
        res.set("Content-Type", req.data.photo.contentType);
        return res.send(req.data.photo.data)
    }
}