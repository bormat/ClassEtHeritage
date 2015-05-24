﻿QUnit.test( "héritage", function( assert ) {
	var Pere=function(){}
	Pere.prototype.getChiffre = function(){return 5}
	
	 Class.create("Fils",{
		extend  : Pere,
	})
	assert.equal( Pere.prototype, Object.getPrototypeOf(Fils.prototype), "Passed!" );
	
	Class.create("PetitFils",{extend : Fils})
	
	var fils = new Fils();
	var pere= new Pere();
	var petitFils = new PetitFils();
	
	assert.equal( fils.getChiffre(), pere.getChiffre(), "Passed!" );
	assert.equal( petitFils.getChiffre(), 5, "Passed!" );

	assert.equal( Fils.prototype.hasOwnProperty("getChiffre"), false, "Passed!" );
	assert.equal( Pere.prototype.hasOwnProperty("getChiffre"), true, "Passed!" );
	//assert.equal( Fils.prototype.$super, Pere.prototype, "Passed!" );
	//assert.equal( petitFils.$super, Fils.prototype, "Passed!" );
	
	
	assert.equal( petitFils instanceof Pere, true );
	assert.equal( petitFils instanceof PetitFils, true );
	assert.equal( petitFils instanceof Fils, true );
	assert.equal( fils instanceof PetitFils, false );
	assert.equal( fils instanceof Pere, true );
	assert.equal( fils instanceof Fils, true );



});

QUnit.test( "surcharge", function( assert ) {
	var Pere=function(){}
	Pere.prototype.getChiffre = function(){return 5}
	
	Class.create("Fils",{
		extend  : Pere,
		getChiffre	: function(){return 6}	
	})

	 Class.create("PetitFils",{extend : Fils})
	
	var fils = new Fils();
	var fils2 = new Fils();

	var pere= new Pere();
	var petitFils = new PetitFils();
	
	assert.equal( petitFils.getChiffre(), 6, "Passed!" );
	assert.equal( fils.getChiffre(), 6, "Passed!" );
	assert.equal( fils2.getChiffre(), 6, "Passed!" );
	assert.equal( pere.getChiffre(), 5, "Passed!" );

});

QUnit.test( "constructeur", function( assert ) {
	var Pere=function(){}
	Pere.prototype.getChiffre = function(){return 5}
	
	 Class.create("Fils",{
		extend  : Pere,
		initialize:function(){this._b=9},
		getChiffre	: function(){return 6},
		setA 	: function(a){this._a = a},
		getA 	: function(){return this._a}
	})
	var fils = new Fils();
	var pere= new Pere();
	var fils2= new Fils();

	fils.setA(8);
	fils2.setA(9);
	
	assert.equal( fils.getChiffre(), 6, "Passed!" );
	assert.equal( pere.getChiffre(), 5, "Passed!" );
	assert.equal( fils._a, 8, "Passed!" );
	assert.equal( fils._b, 9, "Passed!" );
	assert.equal( fils.getA(), 8, "Passed!" );
	assert.equal( fils2.getA(), 9, "Passed!" );
});

QUnit.test( "constructeurParam", function( assert ) {
	var Pere=function(){}
	Class.create("Fils",{
		extend  : Pere,
		initialize:function(b){this._b=b},
	})
	var fils = new Fils(7);
	var fils2 = new Fils(8);
	assert.equal( fils._b, 7, "Passed!" );
	assert.equal( fils2._b, 8, "Passed!" );

});

QUnit.test( "constructeurHeritage", function( assert ) {
	Class.create("Pere",{
		initialize:function(){this._b=9},
		getNumber:function(){ return 3}
	})
	
	Class.create("Fils",{
		extend  : Pere,
		getNumber:function(){ return $super()+2}
	})
	
	Class.create("PetitFils",{
		extend  : Fils,
		initialize:function(){
			this._b = 3;
		}
	})
		
	var pere= new Pere();
	var fils = new Fils();
	var petitFils = new PetitFils();
	
	assert.equal( pere._b, 9, "Passed!" );
	assert.equal( fils._b, 9, "Passed!" );
	assert.equal( fils.getNumber(), 5, "Passed!" );
	assert.equal( petitFils._b, 3, "Passed!" );

	
});

QUnit.test( "super", function( assert ) {
	Class.create("Pere",{
		initialize:function(){this._b=9},
		getNumber:function(){ return 3}
	})
	
	Class.create("Fils",{
		extend  : Pere,
		getNumber:function(){ 
			return $super() + 1;
		}
	})
	
	Class.create("PetitFils",{
		extend  : Fils,
		initialize:function(){
			$super();
			this._b+=1;//10
		}
	})
	Class.create("PetitPetitFils",{
		extend  : PetitFils,
		initialize:function(){
			this._b = this._b || 99;
			this._b += 2;//101
		}
	})
	var pere= new Pere();
	var fils = new Fils();
	var petitFils = new PetitFils();
	var petitPetitFils= new PetitPetitFils();
	var petitPetitFils2= new PetitPetitFils();
	var petitPetitFils2= new PetitPetitFils();
	var pere2= new Pere();
	pere2._b=2;
	
	assert.equal( pere.getNumber(), 3, "Passed!" );
	assert.equal( pere2._b, 2, "Passed!" );
	assert.equal( pere._b, 9, "Passed!" );

	assert.equal( fils.getNumber(), 4, "Passed!" );
	
	assert.equal( fils._b, 9, "Passed!" );
	assert.equal( petitFils._b,10, "Passed!" );
	
	//attribut privé non hérité
	assert.equal( petitPetitFils._b, 101, "Passed!" );
	assert.equal( petitPetitFils2._b, 101, "Passed!" );
	assert.equal( petitPetitFils._b, 101, "Passed!" );
});

QUnit.test( "super", function( assert ) {
	Class.create("e",{
		extend : Array	
	})	
	var a = new e();
	a.push(0);
	assert.equal( a[0], 0, "Passed!" );
	assert.equal( a.length, 1, "Passed!" );
});

QUnit.test( "severalSuper", function( assert ) {
	var func = function(){};
	func.prototype = {
		coucou:function(){
			return "hello";
		}
	}
	Class.create("func2",{
		extend : func,
		coucou: function(){
			return $super()+ "good afternoom";
		}		
	})
	Class.create("func3",{
		extend : func2,
		coucou: function(){
			return $super()+ "good evening";
		}		
	})
	
	var a = new func3();
	assert.equal( a.coucou(),"hellogood afternoomgood evening", "Passed!" );
});

