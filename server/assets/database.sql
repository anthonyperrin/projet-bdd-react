#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: User
#------------------------------------------------------------

CREATE TABLE User(
        Id        Int  Auto_increment  NOT NULL ,
        Firstname Varchar (255) ,
        Lastname  Varchar (255) ,
        Rank      Int ,
        Address1  Varchar (255) ,
        Address2  Varchar (255) ,
        Pseudo    Char (255) ,
        Mobile    Varchar (10) ,
        Email     Varchar (255) ,
        City      Varchar (255) ,
        Zipcode   Varchar (5) ,
        Password  Varchar (255) ,
        Coins     Int
	,CONSTRAINT User_PK PRIMARY KEY (Id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Genre
#------------------------------------------------------------

CREATE TABLE Genre(
        Id   Int  Auto_increment  NOT NULL ,
        Name Varchar (255) NOT NULL
	,CONSTRAINT Genre_PK PRIMARY KEY (Id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Artist
#------------------------------------------------------------

CREATE TABLE Artist(
        Id        Int  Auto_increment  NOT NULL ,
        LastName  Varchar (255) NOT NULL ,
        FirstName Varchar (255) NOT NULL
	,CONSTRAINT Artist_PK PRIMARY KEY (Id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Disc
#------------------------------------------------------------

CREATE TABLE Disc(
        Id          Int  Auto_increment  NOT NULL ,
        Name        Varchar (255) NOT NULL ,
        Category    Smallint NOT NULL ,
        ReleaseYear Date NOT NULL ,
        Label       Varchar (255) ,
        Price       Int NOT NULL ,
        DateAdd     Datetime NOT NULL ,
        nbViews     Int ,
        lastViewed  Date NOT NULL ,
        Id_Artist   Int NOT NULL ,
        Id_User     Int NOT NULL
	,CONSTRAINT Disc_PK PRIMARY KEY (Id)

	,CONSTRAINT Disc_Artist_FK FOREIGN KEY (Id_Artist) REFERENCES Artist(Id)
	,CONSTRAINT Disc_User0_FK FOREIGN KEY (Id_User) REFERENCES User(Id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Buy
#------------------------------------------------------------

CREATE TABLE Buy(
        Id         Int NOT NULL ,
        Id_User    Int NOT NULL ,
        Status     Smallint NOT NULL ,
        CoinLocked Int
	,CONSTRAINT Buy_PK PRIMARY KEY (Id,Id_User)

	,CONSTRAINT Buy_Disc_FK FOREIGN KEY (Id) REFERENCES Disc(Id)
	,CONSTRAINT Buy_User0_FK FOREIGN KEY (Id_User) REFERENCES User(Id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Disc_Genre
#------------------------------------------------------------

CREATE TABLE Disc_Genre(
        Id      Int NOT NULL ,
        Id_Disc Int NOT NULL
	,CONSTRAINT Disc_Genre_PK PRIMARY KEY (Id,Id_Disc)

	,CONSTRAINT Disc_Genre_Genre_FK FOREIGN KEY (Id) REFERENCES Genre(Id)
	,CONSTRAINT Disc_Genre_Disc0_FK FOREIGN KEY (Id_Disc) REFERENCES Disc(Id)
)ENGINE=InnoDB;

