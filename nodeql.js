exports.create_table = (columns = []) => {
	this.columns = columns;
	this.data = []

	this.insert = (columns = [],data = []) => {
		temp = [];
		for(var i=0;i<this.columns.length;i++){
			index = columns.indexOf(this.columns[i]);
			if(index !== -1){
				temp.push(data[index]);
			}else{
				temp.push(null);
			}
		}
		this.data.push(temp);
	}

	this.export = (type='csv',header=true) => {
		if(type === 'csv'){
			temp = '';
			if(header){
				temp += this.columns.join(',');
				temp += '\n';
			}
			for(var i=0;i<this.data.length;i++){
				temp += this.data[i].join(',');
				temp += '\n';
			}
			return temp.slice(0,-1);
		}
	}

	return this;
}
