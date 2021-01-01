# Freshworks_Assignment

Key Value Datastore

create.js have a class KeyvalueDatastore which is instaniated using a filepath from user.

<h2><b>Functional features</b></h2>
1. filepath is passed by the user during Class initialization if path is not given it will set a defaultpath.<br>
2. Create function createkeyvaluedata can be invoked using key capped at 32 charcters value as parameters.<br>
3. finOne function will check if there is a data in the file corresponding to the key,if key is already present it will return error.Otherwise create a key value pair in the file.We will use findOne function from Repository class<br>
4. readkey function will take key as argument and return the data if key is present otherwise return error.<br>
5. deletekey function will take key as argument and return data if present otherwise return error.<br>
6. Every key has a timetolive property.timetolive is implemented using a queue.enqueue operation is performed when createkeyvaluedata function is invoked.after the the key is created a set timeout function is called after 15 minutes of key creation and it will dequeue the key and delete the key from file.<br>

<h2><b>Non-functional Features</b></h2>
1. checkfilesize is a method in the class which can be used to check the size of file<br>
2. async Lock is used to ensure that more than one client is not allowed to use same file at a given time<br>

