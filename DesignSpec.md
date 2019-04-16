# Design Spec

### User values & requirments
- app should provide accountability for others and effectivly incentivise indeviduals and group to reach goal
- app should have low bar to entry and use
- ease of use and should not be complicated or cumbersome to setup a goal and add members

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

### Screens
- welcome & sign in with Facebook
- page 1: choice to join pending goal or create own goal
- goal creation page?
- page 2: goal home page, where app loads into from now on until goal finishes [contains goalname, checkin buttons, info, statistics, and progress & accountability visualization (so that group accountability is stressed)]
- once finished, congratulations page with summery and score allocation (everyone has to agree to complete)
- back to page 1 for new goals
- Stretch goal of feed page/ window


### Technical requirements
Goal struct
- Goal name
- active members
- pending members
- private or public
- duration and start time of goal
- time and frequency of tasks
- score penalty per missed task
- reminder settings
- max number of members

Profile struct
- unique id from FB
- name
- profile pic
- friends list

Datbase struct
-active accoutns atached to goal ids
-pending accoutns to goal ids
-active goals


invitations to app
default goalpost length

motivations
circle progress indicator with parts that show per person

incremental charges
money for after midpoint
handshake ritual to initialize?

### Failure modes and mitigation strategies
- need to keep everyone on bandwagon and not let one bad performer pull everyone down
- need to make sure event updates propagate instantly to all members
