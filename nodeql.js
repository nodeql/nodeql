//table object
table = (columns,data) => {
	this.columns = columns;
	this.data = data;

	//sql INSERT INTO
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

	//export to string (csv only)
	this.export = (type='csv') => {
		if(type === 'csv'){
			temp = '';
			temp += this.columns.join(',');
			temp += '\n';
			for(var i=0;i<this.data.length;i++){
				temp += this.data[i].join(',');
				temp += '\n';
			}
			return temp.slice(0,-1);
		}
	}

	return this;
}

//sql CREATE TABLE
exports.create_table = (columns) => {
	return table(columns,[]);
}

//import from string (csv only)
exports.import = (file='',type='csv') => {
	if(type == 'csv'){
		lines = file.split('\n');
		var columns = lines[0].split(',');
		var data = [];
		for(var i=1;i<lines.length;i++){
			data.push(lines[i].split(','));
		}
		return table(columns,data);
	}
}
