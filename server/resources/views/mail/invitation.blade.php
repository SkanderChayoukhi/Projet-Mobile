@component('mail::message')
    # Cher {{$first_name}} {{$last_name}}, 
    Vous avez été invité au groupe : {{$group_name}}
    Veuiller entrer le code de validation : {{$number}} pour faire partie du groupe.
@endcomponent