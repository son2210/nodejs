
import Species from '../models/speacies'
import formidable from 'formidable'
import  _ from 'lodash'
export const addSpecies = (req, res) => {
    let form = formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fildes, flies) => {
        console.log(fildes);
        if (err) {
            return res.status(400).json({
                err: " Không thêm được !"
            })
        }
        const { name } = fildes
        // if (!name) {
        //     return res.status(400).json({
        //         err: "Không được để trống"
        //     })
        // }
        let species = new Species(fildes)
        species.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    err: " Thêm thất bại !"
                })
            }
            res.json(data)
        })
    })

}
export const listSpecies = (req, res) => {
    Species.find((err, data) => {
        if (err) {
            return res.status(400).json({
                err: "Không có Thông Tin"
            })
        }
        res.json(data)
    })
}
export const speciesId = (req, res, next, id) => {
    Species.findById(id).exec((err, species) => {
        if (err) {
            return res.status(400).json({
                err: "  Không tìm thấy "
            })
        }
        req.species = species
        next();
    })
}
export const speciesDetails = (req, res) => {
    return res.json(req.species)
}
export const remove = (req, res) => {
    let species = Species(req.species)
    species.remove((err, deleteSpecies) => {
        if (err) {
            return res.status(400).json({
                err: "Xóa thất bại !"
            })
        }
        res.json({
            deleteSpecies,
            message: " Xóa thành công !"
        })
    })
}
export const updateSpecies = (req, res) => {
    let form = formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fildes, flies) => {
        console.log(fildes);
        if (err) {
            return res.status(400).json({
                err: " Cập nhật thất bại1  !"
            })
        }
        const { name } = fildes
        if (!name) {
            return res.status(400).json({
                err: "Không được để trống"
            })
        }
        let species = req.species
        species = _.assignIn(species, fildes)
        species.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    err: " Cập nhật thất bại !"
                })
            }
            res.json({
                data,
                message: " Cập Nhật Thành Công "
            })
        })
    })
}