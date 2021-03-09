from app.models import TodoItem, Memo, Event
from datetime import date, timedelta, datetime

today = datetime.today()

demo_objects = [
    TodoItem(user_id=1, todo="Checkout the dark mode feature!", priority_level=4, is_done=False),
    TodoItem(user_id=1, todo="This list will sort according to priorty!", priority_level=4, is_done=True),
    TodoItem(user_id=1, todo="Click \"Clear completed\" to remove finished todos.", priority_level=3, is_done=True),
    TodoItem(user_id=1, todo="Click + to add a new todo!", priority_level=2, is_done=False),
    TodoItem(user_id=1, todo="Send out that email to John", priority_level=2, is_done=False),
    TodoItem(user_id=1, todo="Drink less coffee", priority_level=1, is_done=False),
    TodoItem(user_id=1, todo="Exercise", priority_level=2, is_done=True),
    Memo(user_id=1, text="Hey there 😃 ! This memo pad autosaves when you type. Try writing something out!"),
    Event(user_id=1, title="Wake up!", start_time=today.replace(hour=15, minute=0, second=0), end_time=today.replace(hour=16, minute=0, second=0), description="Start your morning early!", background_color="orange.400"),
    Event(user_id=1, title="Practice coding.", start_time=today.replace(hour=17, minute=0, second=0), end_time=today.replace(hour=19, minute=0, second=0), description="Hit up that leetcode :)", background_color="green.400"),
    Event(user_id=1, title="Call Alex", start_time=today.replace(hour=21, minute=0, second=0), end_time=today.replace(hour=22, minute=0, second=0), description="", background_color="pink.300")
]
