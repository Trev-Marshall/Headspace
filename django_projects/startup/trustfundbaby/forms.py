from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User

class SignUpForm(UserCreationForm):
    first_name = forms.CharField(max_length=30, required=True, help_text='Required. 30 max characters.')
    last_name = forms.CharField(max_length=30, required=True, help_text='Required. 30 max characters.')
    email = forms.EmailField(max_length=254, help_text='Required. Inform a valid email address.')

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password1', 'password2', )

    # used to style the signup form
    def __init__(self, *args, **kwargs):
        super(SignUpForm, self).__init__(*args, **kwargs)
        self.fields['email'].widget.attrs['style'] = 'width:200px;'
