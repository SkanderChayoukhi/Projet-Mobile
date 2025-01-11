<?php

namespace App\Mail;

use App\Models\Group;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WelcomeToGroupMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $group;
    public $number;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user, Group $group, $number)
    {
        $this->user = $user;
        $this->group = $group;
        $this->number = $number;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: 'Invitation au groupe',
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            markdown: 'mail.invitation',
            with: ['first_name' => $this->user->first_name, 'last_name' => $this->user->last_name, 'group_name' => $this->group->name, 'number' => $this->number],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}
