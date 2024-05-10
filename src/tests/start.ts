/*
Dans le cadre d'un projet en réact + typescript :

Soit le projet débute par la lecture d'un UInt8Array soit par un nuveau projet avec des valeurs par défaut destinées
à etre modifiées par l'utilisateur puis réengistrées par la suite.
J'ai un UInt8Array de taille variable :
a : u32
b : u32
c : u32[] de la taille qu'on trouve dans b
Par contre selon la version il peut y avoir une variable d supplémentaire et des valeurs attendues différentes, donc même les valeurs par défaut ne sont pas constantes.

Ici est un petit exemple mais en vrai le projet est beauuuuuuucoup plus gros, énorme même.
Mais l'esprit réside ici : gérer différentes versions du fichier (variable a) et une structure dynamique


Besoin d'une structure de fichiers
Des fichiers pour commencer
Une stratégie 



La structure réelle est éminemment complexe et nécéssite une grande abstraction
Il faut envisager la sérialisation, désérialisation, création de 0, conversion d'une version à une autre

La structure de base (très raccourcie) est la suivante :

- Scénario
    - UncompressedHeader
        - version (4 chars)
        - Longueur du header (u32)
        - nom du créateur (string de la taille définie en entete par un u16)
        - date (u32)
        - nombre de DLC (u32)
        - tableau de la taille de DLC (nbDLC * u32)
        - Un bloc de données compressées qui va jusqu'a la fin du uint8Array
    - CompressedBloc qu'on vient de décompresser
        - Header2
            - version (f32)
            - Nombre de joueurs (u32)
            - si version > 1.18 : Instructions (string de la taille définie en entete par un u32)
            - si version > 1.20 : Histoire (string de la taille définie en entete par un u32)
        - Triggers
            - Nombre de conditions (u32)
            - Tableau de Conditions (NbConditions * Conditions(Elle meme une structure avec divers u32 f32 etc) )
            - Nombre d'effets (u32)
            - Tableau de d'Effets (NbEffets * Effets(Elle meme une structure avec divers u32 f32 etc) )
        - Bitmap
            - Bitmapversion
            - divers éléments à lire selon version de headerbitmap

J'ai une préférence pour centraliser les choses car ca evite de copier plusieurs fois les memes choses et en plus comme la structure des données evolue il faut
pouvoir la modifier facilement donc il faut une logique de traitement automatique

*/