@component('mail::message')
    # Cher {{$first_name}} {{$last_name}},
    Votre code de vérification est : {{$number}}
@endcomponent