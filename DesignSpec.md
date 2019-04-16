# Design Spec

# User as Stakeholder & their requirments
- wants ease of use and should not be complicated or cumbersome to setup
- app should provide accountability for others and incentivise indeviduals and group to reach goal
- app should have low bar to entry and setup

# Functional flow diagram

# System architecture digram
- profiles: 
  - outsourced through facebook api to handle authentication, profile managment, and security, in adddition to easing social buy in
- goals
  - object managed by us and contins user ids tht goal applies to
  - also contains slush pot and user's contribution history
  
- payment


  List of people, activities, habit times and goal post times, reminders for activities through push, confirmation of completions through push, and tracking of money owed by each person
- Payment:
  At end of goal post challenge sort out who owes what money to make it as few easy transactions as possible
  If charity, we give list of charities to donate to
  Outsource charging and payment infrastructure to trusted api like venmo or paypal or square

# MVP constraints
- no money
- a single goal at a time
- no need to submit proof
- no live feed of public goals
- can't join goal after first task
- once task starts, remove pending invites

# Tech stack
- Android app
  - Android Studio
  - Facebook API
  - Gcal API
  - Firebase API
- BackEnd
  - Firebase
  - Payment API 
  ```diff 
  + Payment API (strech feature)
  ```

# Screens
- welcome & sign in with Facebook
- page 1: choice to join pending goal or create own goal
- goal creation page?
- page 2: goal home page, where app loads into from now on until goal finishes [contains goalname, checkin buttons, info, statistics, and progress & accountability visualization (so that group accountability is stressed)]
- once finished, congratulations page with summery and score allocation (everyone has to agree to complete)
- back to page 1 for new goals
- Stretch goal of feed page/ window


# Technical requirements
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

# Failure modes and mitigation strategies
- need to keep everyone on bandwagon and not let one bad performer pull everyone down
- need to make sure event updates propagate instantly to all members
