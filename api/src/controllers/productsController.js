const { Tablets, Phones, Notebooks } = require('../db');

// -------------------- GET ALL --------------------

const getAllProducts = async (req, res) => {
	try {
		const allPhones = await Phones.findAll();
		const allTablets = await Tablets.findAll();
		const allNotebooks = await Notebooks.findAll();

		if (allPhones.length === 0 || allNotebooks.length === 0 ||allTablets.length === 0) return res.status(404).json({ message: 'Error en find all' });
		//subirTablets
		const allProducts = allPhones.concat(allTablets).concat(allNotebooks);
		if (allProducts.length === 0)
			return res.status(404).json({ message: 'Error en concatenación' });

		res.status(201).json({ message: 'done', allProducts });

	} catch (e) {
		console.log(e);
		res.status(500).json({ message: 'Server error' });
	};
};

// -------------------- TABLETS --------------------

const getAllTablets = async (req, res) => {
	try {
		const allTablets = await Tablets.findAll();
		if (allTablets.length !== 0) {
			return res.status(200).json(allTablets);
		}
		res.status(404).json({ message: 'Not found any tablet' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: 'Server error' });
	};
};

const getTabletById = async (req, res) =>{
    try{
        const {id} = req.params;
        if(!id) res.ratus(404).json({message: 'id is not provided'});
        const validation = await Tablets.findByPk(id);
        if(validation.length === 0){
            res.status(404).json({message: 'id not exists'});
        }else{
            res.status(201).json(validation);
        };
    }catch(e){
        console.log(e);
		res.status(500).json({ message: 'Server error' });  
    };
};

const postTablet = async (req, res) => {
	// NO FUNCIONA
	//PRUEBA POSTEANDO UNICAMENTE UNA TABLET (HABRÍA QUE CREAR UN MODEL DE PRODUCT ASI DEPENDE LA CATEGORÍA SE SUBE O TABLET O NOTEBOOK O PHONE)
	try {
		const {category, model, brand, operative_system, size, inches, main_camera, ram, capacity, frontal_camera, weight, battery, price, image, cpu, description} = req.body;

		if({ category, model, brand, operative_system, size, inches, main_camera, ram, capacity, frontal_camera, weight, battery, price, image, cpu, description}){
            const validation = await Tablets.findOne({where:{ model: model}});
            if(validation.length === 0){
                const newTablet = await Tablets.create({ category, model, brand, operative_system, size, inches, main_camera, ram, capacity, frontal_camera, weight, battery, price, image, cpu, description});
                newTablet.length ? res.status(201).json({message: 'product created', newTablet}) : res.status(404).json({message: 'Error /post product'})
                
            }else{
                res.status(404).json({message: 'product created already'}, validation)
            }
           
        }else{
            res.status(400).json({message: 'error, missing info'});
        };
	}catch (e) {
		console.log(e);
		res.status(500).json({ message: 'Server error' });
	};
};

// -------------------- NOTEBOOKS --------------------

const getAllNotebooks = async (req, res) => {
	try {
		const allNotebooks = await Notebooks.findAll();
		if (allNotebooks.length !== 0) {
			return res.status(200).json(allNotebooks);
		}
		res.status(404).json({ message: 'Not found any tablet' });
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: 'Server error' });
	};
};


const getNotebookById = async (req, res) =>{
    try{
        const {id} = req.params;
        if(!id) res.ratus(404).json({message: 'id is not provided'});
        const validation = await Notebooks.findByPk(id);
        if(validation.length === 0){
            res.status(404).json({message: 'id not exists'});
        }else{
            res.status(201).json(validation);
        };
    }catch(e){
        console.log(e);
		res.status(500).json({ message: 'Server error' });  
    };
};


module.exports = {
	getAllProducts,
	postTablet,
	getTabletById,
	getAllTablets,
	getAllNotebooks,
	getNotebookById

};
