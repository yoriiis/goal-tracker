# Debrief

## "Nouveautés" ES2015+

## Notations concises

Syntaxes permettant de raccourcir les appels/le code.

Noms de propriétés concises : sur un objet litéral, on utilise le n

```js
const first = "Toto";
const last = "Titi";
const toto = { first, last: last };
```

Noms de propriétés calculés : permet de renseigner dynamiquement une clé et sa valeur dans un objet litéral

```js
const obj = { [id]: value }; // la dynamisation se fait par les crochets
// la valeur de "id" sera interprétée via un .toString()
```

Fonction concises :

```js
const obj = {
  name: "Toto",
  sayHello() {
    console.log("hello");
  },
};
```

## Déstructuration

Permet de récupérer une ou plusieurs valeurs depuis un objet (litéral) ou un tableau.
On peut les utiliser dans les signatures de fonction (du coup ça aide à "documenter" l'API).
Sinon on les trouve dans le code, à gauche de l'opérateur d'affection.

```js
const { first, last } = person
const [, second] = array

function Title({ label }) { … }
```

## Rest/Spread

On peut trouver le rest en signature de fonction ou dans le corps.

Les rest fonctionne avec la déstructuration ou en signature de fonction et permet, après extraction par ailleurs de certains arguments d'obtenir ceux qui restent.

```js
function readArgs(first, last, ...others) { … }
function Composant({ first, last, ...props }) { … }

const [first, ...others] = array
const { age, ...rest } = person
```

Le spread à l'inverse permet "d'éclater les valeurs" en les récupérant "à plat" :

```js
const arr1 = arr1.push(...arr2);
const john = { ...person, first: "John" };
```

## Chaînes à gabarit / template strings

Utilisation des backticks pour permettre l'interpolation et le multilignes.

```js
const message = `
- Salut ${first}, ça va?
- Bien et toi ?
`;
```

## Portée / hoisting / this / binding

Le hoisting est le mécanisme qui remonte les déclarations de fonctions et de `var` en haut de la portée courante (fonction ou module). C'est comme ça qu'on peut les utiliser même si elles sont déclarées plus bas dans notre code.

Une fonction n'appartient pas à un objet, elle peut être référencée par des objets. De ce fait, le this dépendra de qui l'appelle et comment elle est appelée.

On est certain que le this est le sujet qu'on attend quand on fait `sujet.verbe(complément)`.

```js
fonction sayHello() { console.log(`Bonjour, je suis ${this.name}`) }
const toto = { name: 'Toto', sayHello }

toto.sayHello() // Bonjour, je suis Toto
setTimeout(toto.sayHello, 0) // Bonjour, je suis undefined (en mode laxiste, sinon ça couine en mode strict)
```

On peut forcer le sujet sur la fonction en bindant :

```js
setTimeout(toto.sayHello.bind(toto), 0); // Là, c'est bon
```

## Fonctions fléchées

Ne redéfini pas le contexte, le `this` est lexical (dit autrement, il a la valeur du this dans le contexte courant).

Une fonction fléchée possède aussi l'intérêt d'être utilisable en tant qu'expression (donc pas de bloc, pratique pour l'utilisation dans le JSX).

## const / let

`const` remplace généralement `var`. Il n'est pas immuable (on peut changer ou ajouter des clés valeurs dans un objet litéral ou ajouter, retirer des valeurs dans un énumérable).

`let` permet la réaffectation (généralement pour de l'affectation conditionnelle via if/else et pour l'asynchrone).

Si on appelle un const ou un let avant sa définition, ça lève une _ReferenceError_.

## Classes

Nom de classe en PascalCase, nouveaux mots clés associés _extends_, _constructor_, _super_…
Ça permet de séduire les développeur 🙂.

## Utilitaires sur array

map, filter, reduce, splice, slice, pop, chomp, Array.isArray… bref, gardez la doc dans un coin, ça sert toujours.

## CSS modules

Une approche de design CSS. Permet de _scoper_ les styles par composant.
La convention veut qu'on ait un fichier qui porte du composant puis `.module.css`.

Géré de base par Create React App.

## Service workers

Dans notre application on en utilisera un qui permettra de mettre en cache les ressources applicatives (images, CSS, JS).

## Storybook

Utilitaire permettant de créer une documentation/bibliothèque des composants et leurs scénarii d'affichages.

## React

V de MVC, permet de gérer l'aspect UI/UX sous forme de composants réutilisables.
Facilite la testabilité de par l'isolation du code des composants.

React fonctionne avec un DOM virtuel : prépare le _rendering_ des composants et fait ses optis en comparant ce qu'il vient de préparer et ce qui est déjà dans le DOM réel.

### Create React App

Facilite le bootstrap de projet React.

### Material-UI

Bibliothèque de composants graphique "recommandée" dans les docs React.

### Types de composants

On peut écrire nos composants sous forme de classes ou de fonctions.
Les fonctions bénéficient des hooks pour partager des comportements.

On préférera l'emploi des fonctions.

Cependant, on est contraint d'utiliser les composants de type classe pour la gestion d'erreurs (on exploite une méthode du cycle de vie des composants classes `componentDidCatch`).

### Props

Équivalence des attributs HTML en React (permet de faire la distinction).

PropTypes : permet de définir les types de propriétés attendus pour nos composants. Utile uniquement en dev.

### Gestion des tableaux en JSX

On peut passer un tableau de composants à du JSX (dans une expression), React saura l'interpreter.

`key` : prop qui permet d'identifier un élément dans un tableau et donc à faire ses optis de rendering.

## Hooks

Capacité de partager des savoirs faire facilement entre composants.
React propose de nombreux hooks, mais on peut aussi créer les nôtres.

### useState

Renvoie un tableau avec la valeur courante de l'état et la fonction de mutation.
La fonction de mutation permet de notifier React qu'un render est attendu.

```js
const [state, setState] = useState(initialValue);
// Pour garantir qu'on utilise la dernière valeur
// à jour de l'état au moment de la mutation, on passe
// par une fonction de callback
setState((stateAjour) => stateAjour + modifs);
```

### useRef

Offre la possibilité de créer un pointeur/une référence sur un élément du DOM réel.

```js
// Cas avec un input
function InputForm() {
  const inputRef = useRef();

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} />
    </form>
  );

  function handleSubmit(event) {
    event.preventDefault();
    console.log(inputRef.current.value);
  }
}
```

Ça amène le sujet des champs contrôlés et non contrôlé.

Un champ contrôlé a sa valeur forcée, et une écoute sur la saisie (généralement via un useState).

```js
function UpperCasedInput() {
  // Attention, ici sans valeur textuelle renseignée à vide,
  // on aurait une erreur en console du type :
  // "Warning: A component is changing an uncontrolled input to be controlled"
  const [value, setValue] = useState();

  return <input type="text" onChange={handleChange} value={value} />;

  function handleChange({ target: { value } }) {
    setValue(value.toUpperCase());
  }
}
```

### useEffect

Permet d'effectuer une opération une fois l'affichage réalisé dans le DOM réel.
On a vu l'utilisation du useEffect avec le _focus_ sur un input : on attend que l'input soit affiché dans le DOM pour y mettre le _focus_.

Le second argument est optionnel et correspond au tableau des dépendances, ou dit autrement la liste des variables qui conditionnent l'actualisation du _useEffect_.

```js
function Component({ label }) {
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
    console.log;

    // return éventuel pour du cleanup
  }, []);
}
```

## Tests unitaires et d'intrégration

On utilise Jest qui est recommandé par React et qui est intégré à Create React App.

### Testing library + React Testing Library (RTL)

Permet d'avoir un rendering des composants en équivalence du DOM réel (mais en mémoire).
Ajoute des assertions pour requêter sur ce pseudo DOM.

La procédure recommandée est d'effectuer le `render` puis de requêter via le `screen`.

Les intéractions utilisateurs sont simulées via `userEvent` de Testing Library. Attention, l'emploi des actions utilisateurs est à faire **de manière asynchrone**.

On a vu qu'on pouvait observer l'équivalence du rendu DOM réel via la fonction _debug_ retournée par le *render* :

```js
const { debug } = render(<Composant />);
debug();
```

Sur le même principe on a accès aussi à la propriété container, utile par exemple pour faire du _snapshot testing_.

```js
const { container } = render(<Composant />);
expect(container).toMatchSnapshot("Nom éventuel pour préciser le snapshot");
```

## Gestion des évènements

React gère de manière plus simple l'écoute des évènements.
On a vu plusieurs de ces évènements : _onClick_, _onChange_, _onBlur_, _onDoubleClick_.

## Gestion des erreurs

```js
import { any } from "prop-types";
import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: any,
  fallback: any,
};
```

Utilisation en enrobage des composants au niveau le plus pertinent (ou aux niveaux).

```js
// Par exemple autour des widgets dans TrackerScreen
<ErrorBoundary fallback="Oops, y’a eu un problème">
  <GoalTrackerWidget goal={goal} progress={todaysProgress[goal.id] || 0} />
</ErrorBoundary>
```

## Redux

Permet de gérer un store global pour notre application.

Un évènement génère une action qui est envoyée au store via le dispatch qui va lui faire traverser nos reducers pour obtenir un nouveau state (dérivé du précédent). Dit autrement, redux est non mutatif.

Redux a un fonctionnement synchrone.

Pour récupérer les infos de mise à jour de l'état, on fonctionnera avec un système d'écoute (pattern _observer_).

### Redux Toolkit (RTK)

Simplification d'écriture des reducers et utilitaires pour les "bonnes pratiques" concernant les cas d'usage classique des stores.

### Reducers

Pour bien structurer le code, on recommande de suivre la convention Ducks qui propose de regrouper tout ce qui touche à un reducer dans un module unique, dans un sous-répertoire reducers dans l'appli.

On définit nos actions avec des noms facilement identifiables.
RTK nous donne une fonction pour faire ça bien : `createAction`.
On obtiendra une fonction permettant de créer une action (objet litéral brut) et l'identifiant qu'on lui a donné.

Une action ressemble à ça :

```js
{ type: 'LE NOM DONNÉ', payload: {…} }
```

Dans le module de reducer on trouve aussi la fonction qui est l'export par défaut et qu'on crée avec `createReducer` fourni par RTK.

On définit l'écoute/le traitement des actions dans une fonction de réduction via l'appel `builder.addCase(ACTION_A_ECOUTER)` (chaînable). C'est l'approche par RTK, sinon avec du Redux on passerait par du switch/case.

Dans tous les cas la fonction de réduction prend en paramètres un état par défaut (utile au chargement de l'appli), et en deuxième la fonction de callback qui nous donnera accès au builder.

```js
export default createReducer(defaultState, (builder) => {
  builder.addCase(logInStart, () => ({ loginState: 'pending' }))
    .addCase(logInSuccess, (state, { payload }) => (…)
```

Jusque là nous avons utilisé des réducteurs de tranches (_slice reducers_) qu'on a assemblé avec la fonction `combine` de redux.
L'idée est d'avoir un réducteur permettant de gérer un sous-ensemble seul de notre état applicatif. Ça simplifie l'écriture de nos reducers.

### Création du store

Pour créer notre store on a utilisé la fonction `configureStore` de RTK.

On a vu qu'on pouvait créer une fonction d'enrobage `makeStore` afin de pouvoir charger des états par défaut dans certaines situations (en test ou dans storybook par exemple).

Cette fonction prend en paramètre un objet litéral dans lequel on va passer la propriété `reducer` qui renseigne notre fonction de réduction globale applicative.

### Enhancers / middlewares

On peut passer des `enhancers` qui auront accès au store et aux actions que le traversent pour appliquer des comportements complémentaires (log, requêtage asynchrone).

### Tests des reducers

C'est tout simple, du coup autant faire du "test first".

### Redux dev tools

On peut rejouer, enregistrer et même partager (export/import) les scenarios d'enchaînement des actions qu'on a effectué dans le navigateur.

On peut aussi dispatcher des actions à la mano dans le navigateur.

Chargé automatiquement par RTK.

### react-redux

Passerelle entre React et Redux. Fourni :

- un composant `Provider`
- les hooks `useDispatch` et `useSelector`.

Le provider vient englober le niveau le plus qui consomme la donnée depuis le store qu'on lui passe via la props `store` :

```js
<Provider store={store}><NosComposants></Provider>
```

Le `useSelector` permet au composant de s'abonner aux changements du store. On passe au hook une fonction de callback qui nous donne accès au state à jour et dont le but est de récupérer voire transformer les données du state telles qu'on en a besoin dans le composant.

```js
const data = useSelector((state) => …)
```

Le `useDispatch` permet de récupérer la fonction de dispatch du store pour plus tard envoyer une action au store, en utilisant l'action creator approprié.

```js
const dispatch = useDispatch()

…

// On passe sous forme d'objet litéral
// le payload à l'action creator
dispatch(logIn({ email } ))
```

### Redux offline

De base, ça sert à stocker les infos côté client si on perd la connexion. De base ça stocke dans _localStorage_ (on pourrait sinon lui demander d'utiliser [localForage](https://github.com/localForage/localForage), un module npm bien utile).

On charge le module dans le store et on appelle la fonction récupérée `offline({})` en _enhancer_ dans le _configureStore_.

On l'a utilisé également pour réaliser la requête au serveur pour le login/la connexion à l'application.

```js
export function logIn({ email, password }) {
  return {
    type: logInStart.toString(),
    meta: {
      offline: {
        effect: {
          json: { email, password },
          method: "POST",
          url: `http://${window.location.hostname}:3001/api/v1/sessions`,
        },
        commit: { type: logInSuccess.toString() },
        rollback: { type: logInFailure.toString() },
      },
    },
  };
}
```

## Bonus

Pour rechercher les docs techniques des langages : https://devdocs.io/
Cycle de vie des composants avec les hooks : https://julesblom.com/writing/react-hook-component-timeline
Comparatif d'écriture de composants entre classes et fonctions : https://wattenberger.com/blog/react-hooks
Styled components expliqués par Josh Comeau : https://www.joshwcomeau.com/css/styled-components/
Pourquoi "Testing Library" : https://kentcdodds.com/blog/introducing-the-react-testing-library
Pour les formulaires : https://react-hook-form.com/
Explication de sujets techniques sous forme de cartoons par Lin Clark : https://code-cartoons.com/
Mocker des API Rest ou GraphQL : https://mswjs.io/
Bibliothèque de composants Chakra : https://chakra-ui.com/
Remix, framework React par les gens de React Router : https://remix.run/

Veille :

- Newsletter React (en français ou en anglais) : https://thisweekinreact.com/fr/
- Autre newsletter React : https://react.statuscode.com/
- Sinon plus généraliste JS : https://javascriptweekly.com/
