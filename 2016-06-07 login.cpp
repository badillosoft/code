/**
* @author Alan Badillo Salas
* @email badillo.soft@hotmail.com
* @github https://github.com/badillosoft/code/
*
* @date 2016/06/07
* @version 1.0
*/

#include <iostream>
#include <fstream>
#include <string>

using namespace std;

void login(string &usuario, string &clave) {
	ifstream fr;
	
	fr.open("sesion.dat");

	if (!fr.is_open()) {
		// El archivo de sesión no existe
		// Crear un archivo con los datos del usuario.

		cout << "Usuario: ";
		cin >> usuario;

		clave = getpass("Clave: ");

		ofstream fw;
		
		// Creamos el archivo de sesión
		fw.open("sesion.dat");

		fw << usuario << endl;
		fw << clave << endl;

		fw.close();
	} else {
		// Recuperamos el usuario y la clave del archivo de sesión
		getline(fr, usuario);
		getline(fr, clave);
    	fr.close();
	}
}

int main(int argc, char *argv[]) {
	string usuario;
	string clave;

	login(usuario, clave);

	cout << "Usuario: [" << usuario << "] Clave: [" << clave << "]" << endl;

	return 0;
}