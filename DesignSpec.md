# Design Spec

# Stakeholders 
- users: want ease of use, accountability for others, low barrier to entry, should not be complicated or cumbersome to set up

# Functional flow diagram

# Architectural digram

# Rough Implementation Plan:
- Login for profiles: 
Outsourced through gmail or facebook to handle authentication and be done securely
- Grouping: 
Have some kind of habit everyone has to do if they don't they put money into slush fund to be distributed at end or donated (for groups of 1 or optional for groups of multiple people)
- Each group has:
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
-Android Studio
-Firebase
-Facebook login

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