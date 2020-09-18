//table object
class Table {

	constructor(columns,data){
		this.columns = columns;
		this.data = data;
	}

	//sql INSERT INTO
	insert(columns = [],data = []){
		var temp = [];
		for(var i=0;i<this.columns.length;i++){
			var index = columns.indexOf(this.columns[i]);
			if(index !== -1){
				temp.push(data[index]);
			}else{
				temp.push(null);
			}
		}
		this.data.push(temp);
	}

	//export to string (obj/csv)
	export(type='obj'){
		if(type == 'obj'){
			var output = [];
			for(var i=0;i<this.data.length;i++){
				var temp = {}
				for(var j=0;j<this.columns.length;j++){
					if(this.data[i][j]){
						temp[this.columns[j]]=this.data[i][j];
					}
				}
				output.push(temp);
			}
			return(output);
		}else if(type === 'csv'){
			var temp = '';
			temp += this.columns.join(',');
			temp += '\n';
			for(var i=0;i<this.data.length;i++){
				temp += this.data[i].join(',');
				temp += '\n';
			}
			return temp.slice(0,-1);
		}
	}
}

//sql CREATE TABLE
exports.create_table = (columns) => {
	return new Table(columns,[]);
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
		return new Table(columns,data);
	}
}
