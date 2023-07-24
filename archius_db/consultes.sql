select distinct  (nom_ex) from Pes e natural inner join Usuari u where 
    exists(select * from Inscripcio i where i.nom_user = u.nom and i.Email = e.Email_user ) ;

select nom_user,count(nom_ex) from Inscripcio i,Cardio c 
where i.nom_user = c.nom_user and i.Email = c.Email_user
and i.nom_gym = "fit"