-- CREATE TABLE 
CREATE TABLE belly_button (
	id SERIAL PRIMARY KEY, 
	sample INTEGER NOT NULL,
	event VARCHAR(50), 
	ethnicity VARCHAR(50), 
	gender VARCHAR(1), 
	age INTEGER,
	wfreq INTEGER,
	bbtype VARCHAR(20), 
	location VARCHAR(50),
	country_012 VARCHAR(30),
	zipcode_012 VARCHAR(30),
	country_1319 VARCHAR(30),  
	zipcode_1319 VARCHAR(30),
	dog VARCHAR(20), 
	cat VARCHAR(20), 
	impsurface_013 VARCHAR(40), 
	npp_013 FLOAT,
	maxtemp_013 FLOAT, 
	pfc_013 INTEGER, 
	impsurface_1319 INTEGER, 
	npp_1319 INTEGER,
	maxtemp_1319 FLOAT, 
	pfc_1319 FLOAT
	);
	