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

// Intenta recuperar el usuario y la contraseña
// del archivo sesion.dat (archivo plano) y los
// asgina a las variables referenciadas. Si
// no existe el archivo solicita los valores mediante
// la entrada estándar y crea un nuevo archivo.
void login(string &usuario, string &clave) {
	ifstream fr;
	
	fr.open("sesion.dat");

	if (!fr.is_open()) {
		// El archivo de sesión no existe
		
		// Solicitamos los datos de usuario y contraseña
		cout << "Usuario: ";
		cin >> usuario;

		clave = getpass("Clave: ");

		// Creamos el archivo de sesión
		ofstream fw;
		
		fw.open("sesion.dat");

		// Guardamos cada valor en una línea
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