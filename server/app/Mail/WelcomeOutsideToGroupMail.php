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

class WelcomeOutSideToGroupMail extends Mailable
{
    use Queueable, SerializesModels;

    public $email;
    public $group;
    public $number;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($email, Group $group, $number)
    {
        $this->email = $email;
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
            subject: 'Invitation à AGA FUN',
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
            markdown: 'mail.invitation-externe',
            with: ['group_name' => $this->group->name, 'number' => $this->number],
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
