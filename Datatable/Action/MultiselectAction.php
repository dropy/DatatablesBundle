<?php

/**
 * This file is part of the SgDatatablesBundle package.
 *
 * (c) stwe <https://github.com/stwe/DatatablesBundle>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Sg\DatatablesBundle\Datatable\Action;

use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Class MultiselectAction
 *
 * @package Sg\DatatablesBundle\Datatable\Action
 */
class MultiselectAction extends AbstractAction
{
    /**
     * Name of datatable view.
     *
     * @var string
     */
    protected $tableName;


    /**
     * Display the action into a dropdown list
     *
     * @var boolean
     */
    protected $dropdown;

    /**
     * The modal form container.
     *
     * @var string
     */
    protected $modalFormRoute;


    //-------------------------------------------------
    // OptionsInterface
    //-------------------------------------------------

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setRequired(array('route'));

        $resolver->setDefaults(array(
            'route_parameters' => array(),
            'icon' => '',
            'label' => '',
            'attributes' => array(),
            'role' => '',
            'dropdown'=>false,
            'modal_form_route'=> '' ,
        ));

        $resolver->setAllowedTypes('route', 'string');
        $resolver->setAllowedTypes('route_parameters', 'array');
        $resolver->setAllowedTypes('icon', 'string');
        $resolver->setAllowedTypes('label', 'string');
        $resolver->setAllowedTypes('attributes', 'array');
        $resolver->setAllowedTypes('role', 'string');
        $resolver->setAllowedTypes('dropdown', 'bool');
        $resolver->setAllowedTypes('modal_form_route','string');

        $tableName = $this->tableName;

        $resolver->setNormalizer('attributes', function($options, $value) use($tableName) {
            $baseClass = $tableName . '_multiselect_action_click';
            $value['class'] = array_key_exists('class', $value) ? ($value['class'] . ' ' . $baseClass) : $baseClass;

            return $value;
        });

        return $this;
    }

    //-------------------------------------------------
    // Getters && Setters
    //-------------------------------------------------

    /**
     * Set table name.
     *
     * @param string $tableName
     *
     * @return $this
     */
    public function setTableName($tableName)
    {
        $this->tableName = $tableName;

        return $this;
    }

    /**
     * Get table name.
     *
     * @return string
     */
    public function getTableName()
    {
        return $this->tableName;
    }


    /**
     * @return boolean
     */
    public function isDropdown()
    {
        return $this->dropdown;
    }

    /**
     * @param boolean $dropdown
     */
    public function setDropdown($dropdown)
    {
        $this->dropdown = $dropdown;
    }

    /**
     * @return string
     */
    public function getModalFormRoute()
    {
        return $this->modalFormRoute;
    }

    /**
     * @param string $modalFormRoute
     */
    public function setModalFormRoute($modalFormRoute)
    {
        $this->modalFormRoute = $modalFormRoute;
    }



}
