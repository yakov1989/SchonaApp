/*
Use Master
GO
Drop Database shchuna
GO
*/

   
--====================
--הגדרת המסד הנתונים
--====================

CREATE DATABASE shchuna
ON (NAME = 'Shchuna_Data', 
    FILENAME = 'C:\Shchuna\Shchuna_Data.MDF' , 
    SIZE = 10, 
    FILEGROWTH = 30%) 
LOG ON (NAME = 'Shchuna_Log', 
        FILENAME = 'C:\Shchuna\Shchuna_Log.LDF' ,
        SIZE = 10, 
        FILEGROWTH = 30%)
COLLATE Hebrew_CI_AS
GO

Use shchuna
GO

CREATE TABLE Cities(
	[cityCode] [int] IDENTITY(1,1) NOT NULL,
	[cityName] [nvarchar](50) NULL,
	[Latitude] [nvarchar](50) NULL,
	[Longitude] [nvarchar](50) NULL
);

go

 CREATE TABLE Neighborhood(
	[neighCode] [int] IDENTITY(1,1) NOT NULL,
	[neighName] [nvarchar](50) NULL,
);
GO


CREATE TABLE Users(
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[firstName] [nvarchar](50) NULL,
	[lastName] [nvarchar](50) NULL,
	[email] [nvarchar](50) NULL,
	[cityCode] [int] NULL,
	[neighCode] [int]NULL,
	[userPass] [nvarchar](50) NULL,
	[passwordConfirm] [nvarchar](50) NULL,
);
GO


ALTER TABLE Users 
ADD
Constraint ID_Pk Primary Key (ID)
Go

ALTER TABLE Cities 
ADD
Constraint CodeCity_Pk Primary Key (cityCode)
Go

ALTER TABLE Neighborhood
ADD
Constraint CodeNeigh_Pk Primary Key (neighCode)
Go


--===============

ALTER TABLE Users
ADD
constraint FK_Cities_Users FOREIGN KEY (cityCode) REFERENCES Cities(cityCode)
GO

ALTER TABLE Users
ADD
constraint FK_Neighborhood_Users FOREIGN KEY (neighCode) REFERENCES Neighborhood(neighCode)
GO


insert [dbo].[Cities] ([cityName],[Latitude],[Longitude]) values ('hadera','32.435197','34.914248')
insert [dbo].[Cities] ([cityName],[Latitude],[Longitude]) values ('Tel-Aviv','32.065629','34.780100')
insert [dbo].[Cities] ([cityName],[Latitude],[Longitude]) values ('Netanya','32.311682','34.855235')

insert [dbo].[Neighborhood] ([neighName]) values ('Yigal')
insert [dbo].[Neighborhood] ([neighName]) values ('Dizingof')
insert [dbo].[Neighborhood] ([neighName]) values ('Hashomer')

INSERT [dbo].[Users] ([firstName],[lastName],[email], [cityCode] ,[neighCode],[userPass]) VALUES ('NOY','Masuri','cvcv',1,2,'3333')
INSERT [dbo].[Users] ([firstName],[lastName],[email], [cityCode] ,[neighCode],[userPass]) VALUES ('abc','Masuri','cvcv',1,2,'3333')
INSERT [dbo].[Users] ([firstName],[lastName],[email], [cityCode] ,[neighCode],[userPass]) VALUES ('NOY','Masuri','cvcv',3,2,'3333')
INSERT [dbo].[Users] ([firstName],[lastName],[email], [cityCode] ,[neighCode],[userPass]) VALUES ('NOY','Masuri','cvc',3,3,'5555')
GO

create proc userValidation(@email nvarchar(50), @userPass nvarchar(50))
as 
return 
	select * from Users 
	where email=@email and userPass = @userPass
go