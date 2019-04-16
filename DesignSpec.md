# Design Spec

### User values & requirments
- app should provide accountability for others and effectivly incentivise indeviduals and group to reach goal
- app should have low bar to entry and use
- maintaining motivation is key, so home page must hoghlight contribubutions of each person, perhaps with circular visual like apple watch
- experiece should be fun and pitentialy ritualized to help hype peoople into achieving their goal
  ```diff 
  + charges must be incremental at each activity to renforce habit, not at end (strech feature)
  ```

### MVP constraints
- one active goal at a time
- cannot join goal after first task starts, as it removes oending invites
- scores allocated are imagnary currency points

### Strech feautures
- charging for failed activity attendance and cash payout at end
- multiple active goals at a time
- live feed of public goals
- need to submit proof or attendance of goal

### Functional flow diagram

### System architecture digram
- login with user profiles
  - outsourced through facebook api to handle authentication, profile managment, and security
  - eases buy in for members by piggybacking off of existing social network most people already use
  ```diff 
  + user enters finantial information in order to finish setup (strech feature)
  ```
- pending goals
  - need to handle race conditions and keep track of penfding invites for users that are invited to join app
- goal creation
  - object managed by us in backend
  - contains user ids that goal applies to
  - contains pending invites
  - contains time data for goal
  - contains time data for indevidual activities
  - score cost for missing activity can be chosen from drop down menu
- goal and activity progress
  - push notifications to users before and after event to remind and check attendance
  - tracks historical user contributions and total pot
  ```diff 
  + users must upload proof to show attendance (strech feature)
  ```
  ```diff 
  + anyone who misses activity gets automatically charged (strech feature)
  ```
- goal completion and winnings distribution
  ```diff 
  + winner cashes out slush pot of money (strech feature)
  ```

### Tech stack
- Android app
  - Android Studio
  - Facebook API
  - Gcal API
  - Firebase API
- BackEnd
  - Firebase
  ```diff 
  + Payment API outsourced to something trusted like square or paypal (strech feature)
  ```

### UI experience & Screens
- welcome & sign in with Facebook
- page 1: choice to join pending goal or create own goal
- goal creation page to ente data and invite members
- page 2: goal home page, where app loads into from now on until goal finishes 
  - goalname
  - progress & acountablity visualization to motivate group and indevidual
  - checkin buttons
  - info button
  - completion statistics
  ```diff 
  + interfce to scroll through multiple active goals (strech feature)
  ```
  ```diff 
  + window showing public goal progress, similar to venmo (strech feature)
  ```
- completion page with summary anf score allocation
  - everyone has to agree to complete
- back to page 1 for new goals

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

Profile struct
- unique id from FB
- name
- profile pic
- friends list
- list of active goal
- list of completed goals
  ```diff 
  + list of completed goals (strech feature)
  ```
  
Database struct
- active accounts atached to active goal ids
- active accounts atached to completed goal ids
- pending accounts atached to active goal ids
- pending accounts atached to completed goal ids

### Failure modes and mitigation strategies
- need to keep everyone on bandwagon and not let one bad performer pull everyone down
- need to make sure event updates propagate instantly to all members
