@extends('layouts.auth.app')

@section('content')






<div class="w3-container w3-half w3-margin">
    <form action="{{ url('/login') }}" method="POST" class="w3-container w3-card-4">
        {{ csrf_field() }}
        @if ($errors->has('email'))
            <div>
                <strong>{{ $errors->first('email') }}</strong>
            </div>
        @endif
        <input class="w3-input" type="text" name="email" style="width:90%" required>
        <label>Email</label>
        @if ($errors->has('password'))
            <div>
                <strong>{{ $errors->first('password') }}</strong>
            </div>
        @endif
        <input class="w3-input" type="password" name="password" style="width:90%" required>
        <label>Password</label>
        <button type="submit" class="w3-button w3-section w3-teal w3-show">Log in</button>
    </form>
</div>



<!--
<form class="form-horizontal" role="form" method="POST" action="{{ url('/login') }}">
    {{ csrf_field() }}

    <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
        <label for="email" class="col-md-4 control-label">E-Mail Address</label>

        <div class="col-md-6">
            <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required autofocus>

            @if ($errors->has('email'))
                <span class="help-block">
                    <strong>{{ $errors->first('email') }}</strong>
                </span>
            @endif
        </div>
    </div>

    <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
        <label for="password" class="col-md-4 control-label">Password</label>

        <div class="col-md-6">
            <input id="password" type="password" class="form-control" name="password" required>

            @if ($errors->has('password'))
                <span class="help-block">
                    <strong>{{ $errors->first('password') }}</strong>
                </span>
            @endif
        </div>
    </div>

    <div class="form-group">
        <div class="col-md-6 col-md-offset-4">
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="remember"> Remember Me
                </label>
            </div>
        </div>
    </div>

    <div class="form-group">
        <div class="col-md-8 col-md-offset-4">
            <button type="submit" class="btn btn-primary">
                Login
            </button>

            <a class="btn btn-link" href="{{ url('/password/reset') }}">
                Forgot Your Password?
            </a>
        </div>
    </div>
</form>
-->
@endsection
