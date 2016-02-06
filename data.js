function AssociativeArray(){}
AssociativeArray.prototype.items=[];
AssociativeArray.prototype.has=function(key){
			for(i=0;i<this.items.length;i++){
					if(this.items[i].key==key){
						return i;
					}
				}
			return null;
			};
AssociativeArray.prototype.add=function(txt){
				if(this.has(txt)!=null){
					this.items[this.has(txt)].value+=1;
				}
				else{
					this.items.push({key:txt, value:1});
					}
			};
//AssociativeArray.prototype.getValue=function(key){
//			for(i=0;i<this.keys.length;i++){
//				if(this.keys[i]==key){
//						console.log("value got");
//						return i;
//					}
//				}
//			return;
//			};
AssociativeArray.prototype.contents=function(){
				var s="";
				for(i=0;i<this.items.length;i++)
					s+=this.items[i].key+" has "+this.items[i].value+" occurences ";
				return s;
			};
AssociativeArray.prototype.sortByDesNum=function(){this.items.sort(function(a,b){
		if (a.value < b.value) //Descending order by value
      return 1;
    if (a.value > b.value)
      return -1;
    // a must be equal to b
    return 0;
	})};
AssociativeArray.prototype.sortByKey=function(){this.items.sort(function(a,b){
		if (a.key > b.key) //Descending order by value
      return 1;
    if (a.key < b.key)
      return -1;
    // a must be equal to b
    return 0;
	})};
