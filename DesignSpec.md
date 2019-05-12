# Design Spec

### User values & requirements
- app should provide accountability for others and effectively incentive individuals and group to reach goal
- app should have low bar to entry and use
- maintaining motivation is key, so home page must highlight contributions of each person, perhaps with circular visual like apple watch
- experience should be fun and potentially ritualized to help hype people into achieving their goal
```diff 
+ charges must be incremental at each activity to reinforce habit, not at end (stretch feature)
```

### Stretch features
```diff 
+ charging for failed activity attendance and cash payout at end (stretch feature)
```
```diff 
+ live feed of public goals (stretch feature)
```
```diff 
+ need to submit proof or attendance of goal (stretch feature)
```

### Failure modes and mitigation strategies
- need to keep everyone on bandwagon and not let one bad performer pull everyone down
- need to make sure event updates propagate instantly to all members

### Functional flow diagram

<img src="https://docs.google.com/drawings/d/e/2PACX-1vRKIoLY0rWtWKpHmWYkfLzQMgrxeiKymKfJZ2pPpsZPfa0BfOOll6Mo_Z7qZLTTe1DI_F_d0nZT3zJ1/pub?w=960&amp;h=720">

### System architecture diagram

<img src="https://docs.google.com/drawings/d/e/2PACX-1vTcj8aRlEeXgu_qAhYIugT8xC0sdZYblWw6zErl9qYc8dgqkmSVwfKxPk_NY1r-k4mFiK5VpO8QI8GT/pub?w=1542&amp;h=751">

- login with user profiles
  - outsourced through facebook api to handle authentication, profile management, and security
  - eases buy in for members by piggybacking off of existing social network most people already use
  ```diff 
  + user enters financial information in order to finish setup (stretch feature)
  ```
- pending goals
  - need to handle race conditions and keep track of pending invites for users that are invited to join app
- goal creation
  - object managed by us in backend
  - contains user ids that goal applies to
  - contains pending invites
  - contains time data for goal
  - contains time data for individual activities
  - score cost for missing activity can be chosen from drop down menu
- goal and activity progress
  - push notifications to users before and after event to remind and check attendance
  - tracks historical user contributions and total pot
  ```diff 
  + users must upload proof to show attendance (stretch feature)
  ```
  ```diff 
  + anyone who misses activity gets automatically charged (stretch feature)
  ```
- goal completion and winnings distribution
  ```diff 
  + winner cashes out slush pot of money (stretch feature)
  ```

### UI experience & Screens
- welcome & sign in with facebook
  - <img src="https://user-images.githubusercontent.com/38739818/56320701-8f6ef100-6119-11e9-8461-d4f69464fb43.png" width="150"/> <img src="https://user-images.githubusercontent.com/38739818/56319913-bdebcc80-6117-11e9-8809-df714488ed5a.png" width="150"/>
  
- page 1: choice to join pending goal or create own goal
  - <img src="https://user-images.githubusercontent.com/38739818/56321593-e70e5c00-611b-11e9-8844-75fafc976cbd.png" width="150"/>
  
- goal creation page to enter data and invite members
  - <img src="https://user-images.githubusercontent.com/38739818/56321747-2e94e800-611c-11e9-9601-bc9fc9227321.png" width="150"/>
  
- page 2: goal home page, where app loads into from now on until goal finishes 
  - goal name
  - progress & accountability visualization to motivate group and individual
  - checkin buttons
  - info button
  - completion statistics
  ```diff 
  + goal selection interface (tab/sidebar) to scroll through multiple active goals (stretch feature)
  ```
  ```diff 
  + window showing public goal progress, similar to venmo (stretch feature)
  ```
  - <img src="https://user-images.githubusercontent.com/38739818/56321860-6e5bcf80-611c-11e9-925f-7c4002eb5e53.png" width="150"/> <img src="https://user-images.githubusercontent.com/38739818/56322151-212c2d80-611d-11e9-9e65-815e415080b7.png" width="150"/>
  
- completion page with summary and score allocation
  - everyone has to agree to complete
  - <img src="https://user-images.githubusercontent.com/38739818/56322051-dca09200-611c-11e9-81de-ad015246bd74.png" width="150"/>
  
- back to page 1 for new goals

### Technology stack
- Android app
  - Android Studio
  - Facebook API
  - Gcal API
  - Firebase API
- BackEnd
  - Firebase
  ```diff 
  + Payment API outsourced to something trusted like square or paypal (stretch feature)
  ```
  
### Technical specifications

Goal struct
- Goal name
- active members
- pending members
- private or public
- duration and start time of goal from drop down defaults
- time and frequency of tasks
- score penalty per missed task from drop down defaults
- reminder settings
- max number of members
- active or completed status

Profile struct
- unique id from FB
- name
- profile pic
- friends list
- list of active goal
```diff 
+ list of completed goals (stretch feature)
```
  
Database struct
- active user ids attached to active goal ids
- active user ids attached to completed goal ids
- pending user ids attached to active goal ids
