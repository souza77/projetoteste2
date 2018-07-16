const csvModule = require("read-csv-json")
const axios = require("axios")

const arqCsv = './dados.csv';
const row = ['info'];

const csvRead = new csvModule(arqCsv, row);
let dados = []

const dadosExcel = () => {

	const retorno = false

	csvRead.getCSVJson().then((result) => {
	let dadosFiltrados = result.map((item, index) => {
		let dado = item.info.split(';') 
		let lengthIdFuncional = dado[1].length
		let lengthCpf = dado[3].length
		let obj = {
			nome : dado[0],
			idFuncional : dado[1].slice(0, -2) + dado[1][lengthIdFuncional-1],
			rg : dado[2],
			cpf : dado[3].slice(0, -3) + dado[3][lengthCpf-2] + dado[3][lengthCpf-1]
		}
		obj.cpf = obj.cpf.replace(' ', '')
		obj.cpf = obj.cpf.replace(' ', '')
		obj.cpf = obj.cpf.replace('.', '')
		obj.cpf = obj.cpf.replace('.', '')

		//console.log(obj.cpf)
		retorno = obj	
	})
	//console.log(dadosFiltrados)
	}, (err) => {
		console.log('err:',err)
	});

	return retorno

}

module.exports = dadosExcel


