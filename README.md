# MandM Project

# Interactive platform with accessibility and internationalization ready for gaming, authoring, evaluating graphic adventure mini-games

The platform is composed by three main applications: Player, Editor and Evaluator

## Editor app
Create, duplicate, delete and edit mini-games called "stories".  
Stories can be played by teams, group or single players. Teams based stories have specific mission list.  
The Platform has been conceived to be played using 1 device per team, 1 device for the group mode and 1 device for the single mode.
So the group mode is not tecnically different than single mode, but we use it for reference purpose for authors.
Also the age and description are also used for reference purpose only.  
Each story is composed by missions and each mission is composed by activities. So different routes of the story can be chosed by player if author allowed it.  
Every activity has its own customizable scene adding widgets to a grid layout and also nesting grids.  
Upload assets like media, captions and stylesheets to use in some widgets.  
Create your own style or upload a stylesheet to change the look and feel of the Player and of the story using the Style Editor.  

![Story Editor](https://user-images.githubusercontent.com/32840785/107789150-85d46580-6d51-11eb-8163-2a88dd9ca25a.PNG)

Manage missions of every team in the main Story Editor tab![Mission groups Editor](https://user-images.githubusercontent.com/32840785/107789233-a2709d80-6d51-11eb-99a7-4212378dc0b1.PNG)

Activities can be of different types:  
- Tell: Use it to tell and explains environment and story related stuff to tell to players
- Quest: Use it to place interactive widgets to be used by player, and providing silently a sort of input and change the future routes based on inputs in the scene.
- Branch: Tecnical activity used to check player inputs on last parent Quest activity and providing score to player, checking input values provided by user through widgets in the scene through a specific condition, and redirect story to different route of activities based on that condition

Edit the scene of an activity using the Scene editor: ![The Scene editor](https://user-images.githubusercontent.com/32840785/107789297-b4524080-6d51-11eb-8cc7-b4ab9a236e07.PNG)
Customize a widget using the specific editor for a widget: ![The specific editor for a widget](https://user-images.githubusercontent.com/32840785/107789289-b1575000-6d51-11eb-889c-0f5125b9ba3c.PNG)

Every text content of some widgets is always internazionalized on the current selected language in main "Story" tab.  
![Some internationalizable text fields](https://user-images.githubusercontent.com/32840785/107789230-a13f7080-6d51-11eb-82d2-3206365c76e2.PNG)

here there is a specific editor for the scene's grid: ![The specific editor for the scene's grid](https://user-images.githubusercontent.com/32840785/107789275-adc3c900-6d51-11eb-8067-f48497d3f334.PNG)

Here there is a specific editor for a widget used to show media, providing also accessibility and internazionalization dedicated fields ![The specific editor for widget to show media](https://user-images.githubusercontent.com/32840785/107789198-94bb1800-6d51-11eb-81f0-d6db66c798f9.png)

The branch editor: ![The branch in Activity Editor](https://user-images.githubusercontent.com/32840785/107789237-a3093400-6d51-11eb-99cc-6233cff63aba.PNG)

The Style Editor guide you to write CSS rules with a correct syntax using specific selector fields and some utility widgets: ![The Style Editor](https://user-images.githubusercontent.com/32840785/107789263-aac8d880-6d51-11eb-9675-c304eb66c31f.PNG)

Controls the used assets or remove them from the platform if they are not needed anymore using the Asset manager: ![The assets manager on locale section](https://user-images.githubusercontent.com/32840785/107789243-a4d2f780-6d51-11eb-9d49-d36946f42f07.PNG)

Use the utility section to store aside the qrcodes used in the story to print them later and place them in your gaming environment: ![utility section for qr codes](https://user-images.githubusercontent.com/32840785/107789258-a997ab80-6d51-11eb-86a1-2a30a40c27dd.PNG)

## Player app
Web app used by players to play a story.  
It contains 3 sections:  
- Main: The section where the scene on every activity will be shown
- Info: The section when author can provide internazionalized information content about current activity and the mission that the activity is part of
- Help: The section where player can ask help to an helper ( an evaluator ) to ask something or any info through a chat. The player ask help, but only if the evaluator accept the help, a chat will be shown.

![All Player App sections](https://user-images.githubusercontent.com/32840785/107789166-8a991980-6d51-11eb-95ed-8c0e4d2e2913.png)

The player App after loading the story, it waits for the start of the story, and after start, it provide every inputs, score and story progression updates to evaluator.
The player App works also offline after the start of the story. this feature is usefull to play the story also in areas that aren't covered by wifi.
The progression will be kept in Player and will be provided to evaluator as soon as it can connects to the platform.


## Evaluator app
Web App used to start, monitoring player progression while playing the story.  
Notify when a player require help.  
Notify when a player is stuck on an activity for too long, or when an activity can't be evaluated programmatically and require a human evaluation ( used for example when a widget provide an captured image, video or audio ) and so can provide a score to it without letting the player to wait the evaluation. 
Shows story progression status for each player and shows also a leaderboard.  

This is the evaluator main view: ![Evaluator App main view](https://user-images.githubusercontent.com/32840785/107789193-9258be00-6d51-11eb-8c3a-21a0de100c5c.png)  
The evaluator allow to show player chat and compacted activities and missions done ![](https://user-images.githubusercontent.com/32840785/107789164-8967ec80-6d51-11eb-85fc-898b3ce382b1.PNG)  
This is how the stuck notification will be shown and evaluator can view which activity the player is stuck on, by clicking on alarm button in player section's toolbar:  
![Evaluator App stuck notification view](https://user-images.githubusercontent.com/32840785/107802282-69d8c000-6d61-11eb-8009-520f9264bf24.PNG)  
This is the leaderboard to show the player scores in one place: ![The evaluator App leaderboard](https://user-images.githubusercontent.com/32840785/107789159-8836bf80-6d51-11eb-8a43-fc00add5068b.PNG)  

