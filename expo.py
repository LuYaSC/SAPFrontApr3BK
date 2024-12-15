import json

# Nombre del archivo donde se guardará la base de datos
FILENAME = "database.json"

# Cargar base de datos desde el archivo
def cargar_base_de_datos():
    try:
        with open(FILENAME, "r") as archivo:
            return json.load(archivo)
    except FileNotFoundError:
        return []
    except json.JSONDecodeError:
        return []

# Guardar base de datos en el archivo
def guardar_base_de_datos():
    with open(FILENAME, "w") as archivo:
        json.dump(database, archivo, indent=4)
        print("Base de datos guardada.")

# Base de datos inicial
database = cargar_base_de_datos()

def agregar_registro():
    nombre = input("Ingrese el nombre: ").strip()
    edad = input("Ingrese la edad: ").strip()
    ocupacion = input("Ingrese la ocupación: ").strip()
    database.append({"nombre": nombre, "edad": int(edad), "ocupacion": ocupacion})
    print(f"Registro de {nombre} agregado.")
    guardar_base_de_datos()

def mostrar_registros():
    if not database:
        print("La base de datos está vacía.")
    else:
        print("Registros:")
        for i, registro in enumerate(database, start=1):
            print(f"{i}. Nombre: {registro['nombre']}, Edad: {registro['edad']}, Ocupación: {registro['ocupacion']}")

def buscar_por_nombre():
    nombre = input("Ingrese el nombre a buscar: ").strip()
    encontrados = [reg for reg in database if reg["nombre"].lower() == nombre.lower()]
    if encontrados:
        print("Resultados de la búsqueda:")
        for reg in encontrados:
            print(f"Nombre: {reg['nombre']}, Edad: {reg['edad']}, Ocupación: {reg['ocupacion']}")
    else:
        print("No se encontraron registros con ese nombre.")

def eliminar_registro():
    mostrar_registros()
    try:
        indice = int(input("Ingrese el número del registro que desea eliminar: ")) - 1
        if 0 <= indice < len(database):
            eliminado = database.pop(indice)
            print(f"Registro de {eliminado['nombre']} eliminado.")
            guardar_base_de_datos()
        else:
            print("Número inválido.")
    except ValueError:
        print("Entrada inválida.")

def editar_registro():
    mostrar_registros()
    try:
        indice = int(input("Ingrese el número del registro que desea editar: ")) - 1
        if 0 <= indice < len(database):
            registro = database[indice]
            print(f"Editando el registro de {registro['nombre']}:")
            registro["nombre"] = input(f"Nuevo nombre (actual: {registro['nombre']}): ").strip() or registro["nombre"]
            registro["edad"] = int(input(f"Nueva edad (actual: {registro['edad']}): ").strip() or registro["edad"])
            registro["ocupacion"] = input(f"Nueva ocupación (actual: {registro['ocupacion']}): ").strip() or registro["ocupacion"]
            print("Registro actualizado.")
            guardar_base_de_datos()
        else:
            print("Número inválido.")
    except ValueError:
        print("Entrada inválida.")

def menu():
    while True:
        print("\nMenú:")
        print("1. Agregar un registro")
        print("2. Mostrar todos los registros")
        print("3. Buscar por nombre")
        print("4. Eliminar un registro")
        print("5. Editar un registro")
        print("6. Salir")
        opcion = input("Seleccione una opción: ").strip()

        if opcion == "1":
            agregar_registro()
        elif opcion == "2":
            mostrar_registros()
        elif opcion == "3":
            buscar_por_nombre()
        elif opcion == "4":
            eliminar_registro()
        elif opcion == "5":
            editar_registro()
        elif opcion == "6":
            print("Saliendo del programa. ¡Adiós!")
            break
        else:
            print("Opción inválida. Intente nuevamente.")

# Ejecutar el programa
menu()
