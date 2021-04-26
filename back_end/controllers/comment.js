import formidable from 'formidable'
import  Coment from '../models/comment'
export const  addComent = (req,res)=>{
            const {contenComment, adminId ,productId}= req.body
            console.log(adminId);
            if(!contenComment || !adminId || !productId){
                return res.status(400).json({
                    err:  "Nhập đầy đủ các trường !"
                })
            }
            const cmt = new Coment(req.body)
            console.log(cmt);
            cmt.save((err, data) => {
                if(err){
                    return res.status(400).json({
                        err: "Thêm thất bại ! "
                    })
                }
                res.json({data, message : "Bình luận thành công "})
            })
  
}
export const list = (req, res)=>{
    Coment.find((err, data)=>{
        if(err){
            return res.status(400).json({
                err: "Lỗi !"
            })
        }
        res.json(data)
    })
}
export const  commnetId = (req, res, next , id)=>{
    Coment.findById(id).exec((err, data)=>{
        if(err){
            return res.status(400).json({
                err: 'Thất bại !'
            })
        }
        req.coment= data
        next();
    })
}
export const remove = (req, res) =>{
        let coment = req.coment
        coment.remove((err, data)=>{
            if(err){
                return res.status(400).json({
                    err: " Xóa Thất bại !"
                })
            }
            res.json({
                data, 
                message: "Xóa thành công !"
            })
        })
}
export const update = (req, res)=>{
    let form  =formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req , (err,fildes, files)=>{
        if(err){
            res.status(400).json({
                err:  ' Thêm thất bại !'
            })
        }
        const {contenComment, adminId ,productId}= fildes
        if(!contenComment || !adminId || !productId){
            return res.status(400).json({
                err:  "Nhập đầy đủ các trường !"
            })
        }
        let coment = new Coment(fildes)
        coment.save((err, data) => {
            if(err){
                return res.status(400).json({
                    err: "Thêm thất bại ! "
                })
            }
            res.json(data)
        })
    })
}
export const  commentDetails = (req,res)=>{
        return  res.json(req.comment)
}